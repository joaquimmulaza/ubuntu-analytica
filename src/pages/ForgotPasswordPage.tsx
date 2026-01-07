import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const requestPasswordReset = useAction(api.passwordRecovery.requestPasswordReset);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            const result = await requestPasswordReset({ email });
            setMessage(result.message);
            setEmail("");
        } catch (err: any) {
            setError("Erro ao processar solicitação. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-midnight-black font-body">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-electric-blue rounded-full opacity-20 filter blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-cyber-purple rounded-full opacity-20 filter blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative w-full max-w-md p-8 m-4 rounded-2xl glass-neon border-glow animate-fade-in-up">
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
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white font-heading tracking-wide">
                        Esqueceu a senha?
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Digite seu email para receber instruções de recuperação.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-5 py-4 text-white bg-midnight-black/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all duration-300 placeholder-transparent peer"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-5 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-electric-blue peer-focus:bg-midnight-black peer-focus:px-2 pointer-events-none peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-midnight-black peer-[:not(:placeholder-shown)]:px-2"
                        >
                            Email
                        </label>
                        <div className="absolute right-4 top-4 text-gray-500 group-focus-within:text-electric-blue transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                    </div>

                    {message && (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm animate-fade-in-up">
                            <div className="flex">
                                <svg
                                    className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-sm text-green-100">{message}</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-shake">
                            <div className="flex">
                                <svg
                                    className="w-5 h-5 text-red-400 mr-3 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-electric-blue/90 hover:to-cyber-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue transition-all duration-300 transform hover:scale-[1.02] shadow-glow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                "Enviar instruções"
                            )}
                        </button>
                    </div>
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

export default ForgotPasswordPage;
