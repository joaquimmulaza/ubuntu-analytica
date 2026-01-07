import React, { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const resetPasswordWithToken = useAction(api.passwordRecovery.resetPasswordWithToken);

    useEffect(() => {
        if (!token) {
            setError("Token de recuperação não encontrado. Verifique o link no email.");
        }
    }, [token]);

    // Calcular força da senha
    useEffect(() => {
        if (!newPassword) {
            setPasswordStrength(0);
            return;
        }

        let strength = 0;
        if (newPassword.length >= 8) strength += 25;
        if (newPassword.length >= 12) strength += 25;
        if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength += 25;
        if (/[0-9]/.test(newPassword)) strength += 12.5;
        if (/[^a-zA-Z0-9]/.test(newPassword)) strength += 12.5;

        setPasswordStrength(Math.min(strength, 100));
    }, [newPassword]);

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500";
        if (passwordStrength < 70) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (passwordStrength < 40) return "Fraca";
        if (passwordStrength < 70) return "Média";
        return "Forte";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!token) {
            setError("Token inválido");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("As senhas não correspondem");
            return;
        }

        if (newPassword.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres");
            return;
        }

        setIsLoading(true);

        try {
            const result = await resetPasswordWithToken({
                token,
                newPassword,
            });

            setMessage(result.message);
            setNewPassword("");
            setConfirmPassword("");

            // Redirecionar para login após 3 segundos
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Erro ao redefinir senha. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-midnight-black font-body">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] bg-electric-blue rounded-full opacity-20 filter blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-neon-coral rounded-full opacity-15 filter blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative w-full max-w-md p-8 m-4 rounded-2xl glass-neon border-glow animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-electric-blue to-purple-600 shadow-glow-soft animate-float">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white font-heading tracking-wide">
                        Redefinir Senha
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Crie uma nova senha segura para sua conta.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="relative group">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                className="w-full px-5 py-4 text-white bg-midnight-black/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all duration-300 placeholder-transparent peer"
                                placeholder="Nova Senha"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={isLoading || !token}
                            />
                            <label
                                htmlFor="newPassword"
                                className="absolute left-5 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-electric-blue peer-focus:bg-midnight-black peer-focus:px-2 pointer-events-none peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-midnight-black peer-[:not(:placeholder-shown)]:px-2"
                            >
                                Nova Senha
                            </label>
                        </div>

                        {/* Strength Indicator */}
                        {newPassword && (
                            <div className="bg-midnight-black/30 p-3 rounded-lg border border-white/5 animate-fade-in-up">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-400">Força da senha:</span>
                                    <span className={`text-xs font-bold ${passwordStrength < 40 ? 'text-red-400' :
                                            passwordStrength < 70 ? 'text-yellow-400' :
                                                'text-green-400'
                                        }`}>
                                        {getStrengthText()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ease-out ${getStrengthColor()} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                        style={{ width: `${passwordStrength}%` }}
                                    ></div>
                                </div>
                                <p className="mt-2 text-[10px] text-gray-500 leading-tight">
                                    Use 8+ caracteres, maiúsculas, minúsculas e números.
                                </p>
                            </div>
                        )}

                        <div className="relative group">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full px-5 py-4 text-white bg-midnight-black/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all duration-300 placeholder-transparent peer"
                                placeholder="Confirmar Nova Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading || !token}
                            />
                            <label
                                htmlFor="confirmPassword"
                                className="absolute left-5 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-electric-blue peer-focus:bg-midnight-black peer-focus:px-2 pointer-events-none peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-midnight-black peer-[:not(:placeholder-shown)]:px-2"
                            >
                                Confirmar Nova Senha
                            </label>

                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="absolute -bottom-5 left-2 text-xs text-red-400 flex items-center animate-shake">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    As senhas não correspondem
                                </p>
                            )}
                        </div>
                    </div>

                    {message && (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm animate-fade-in-up">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-100">{message}</p>
                                    <p className="text-xs text-green-300/70 mt-1">Redirecionando para login...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-shake">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !token || (!!confirmPassword && newPassword !== confirmPassword)}
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-electric-blue/90 hover:to-cyber-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue transition-all duration-300 transform hover:scale-[1.02] shadow-glow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Redefinindo...
                            </span>
                        ) : (
                            "Redefinir Senha"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"
                    >
                        <svg
                            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Voltar para o login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
