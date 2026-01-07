import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAction(api.authActions.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const token = await login({ username, password });
      localStorage.setItem("token", token);

      // Animação de sucesso antes de redirecionar
      setTimeout(() => {
        window.location.href = "/admin"; // Redirect to the admin panel
      }, 500);
    } catch (err: any) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen pt-32 pb-12 overflow-hidden bg-midnight-black font-body">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-blue rounded-full opacity-20 filter blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple rounded-full opacity-20 filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-neon-coral rounded-full opacity-10 filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md p-8 m-4 rounded-2xl glass-neon border-glow animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-electric-blue to-cyber-purple shadow-glow-soft animate-float">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white font-heading tracking-wide mb-2">
            Painel Admin
          </h1>
          <p className="text-gray-400 text-sm">
            Bem-vindo de volta! Acesse sua conta.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-5 py-4 text-white bg-transparent border border-gray-700/50 rounded-xl focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all duration-300 placeholder-transparent peer"
                placeholder="Nome de Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 bg-midnight-black px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-xs peer-focus:text-electric-blue peer-focus:bg-midnight-black pointer-events-none peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-midnight-black"
              >
                Nome de Usuário
              </label>
              <div className="absolute right-4 top-4 text-gray-500 group-focus-within:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="relative group">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-5 py-4 text-white bg-transparent border border-gray-700/50 rounded-xl focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all duration-300 placeholder-transparent peer"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 bg-midnight-black px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-xs peer-focus:text-electric-blue peer-focus:bg-midnight-black pointer-events-none peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-midnight-black"
              >
                Senha
              </label>
              <div className="absolute right-4 top-4 text-gray-500 group-focus-within:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-electric-blue hover:text-neon-coral transition-colors duration-300 hover:underline hover:decoration-neon-coral underline-offset-4"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-shake">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-200">{error}</p>
              </div>
            </div>
          )}

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
                Verificando...
              </span>
            ) : (
              <span className="flex items-center">
                Acessar Painel
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-white text-sm transition-colors duration-300 flex items-center justify-center gap-2 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
