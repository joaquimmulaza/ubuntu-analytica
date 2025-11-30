import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CareersPage = () => {
    const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formsubmit.co/ajax/joaquimmulazadev@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setFormStatus('success');
                e.target.reset();
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black to-purple-900/20"></div>
                    <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-extrabold mb-6"
                    >
                        Junte-se à <span className="text-transparent bg-clip-text bg-gradient-primary">Equipa</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
                    >
                        Estamos à procura de talentos apaixonados por dados e inovação para transformar o futuro da inteligência de negócios.
                    </motion.p>
                </div>
            </section>

            {/* Application Form Section */}
            <section className="container mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto bg-midnight-black/80 p-8 md:p-12 rounded-neon border border-soft-neon-glow/30 backdrop-blur-neon shadow-glow-soft"
                >
                    <h2 className="text-2xl font-heading font-bold mb-8 text-center">Formulário de Candidatura</h2>

                    {formStatus === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Candidatura Enviada!</h3>
                            <p className="text-gray-300">Obrigado pelo seu interesse. Analisaremos o seu perfil e entraremos em contacto brevemente.</p>
                            <button
                                onClick={() => setFormStatus(null)}
                                className="mt-8 text-electric-blue hover:text-white transition-colors"
                            >
                                Enviar nova candidatura
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                            {/* Hidden Configuration Fields for FormSubmit */}
                            <input type="hidden" name="_subject" value="Nova Candidatura - Ubuntu Analytica" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_captcha" value="false" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                        placeholder="+244 9XX XXX XXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn / Portfólio</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Posição a que se candidata *</label>
                                <select
                                    name="position"
                                    required
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all appearance-none"
                                >
                                    <option value="" disabled selected>Selecione uma posição</option>
                                    <option value="Data Engineer">Data Engineer</option>
                                    <option value="Data Analyst">Data Analyst</option>
                                    <option value="Business Intelligence Consultant">Business Intelligence Consultant</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Outra">Outra / Candidatura Espontânea</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Carta de Motivação / Mensagem</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                    placeholder="Conte-nos um pouco sobre si e porque quer juntar-se a nós..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Anexar CV (PDF ou Word) *</label>
                                <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-electric-blue transition-colors text-center cursor-pointer group">
                                    <input
                                        type="file"
                                        name="attachment"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <svg className="w-10 h-10 text-gray-500 group-hover:text-electric-blue mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            Arraste o ficheiro ou clique para selecionar
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">PDF, DOC ou DOCX (Max 5MB)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-gradient-primary hover:shadow-glow-medium text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-glow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Candidatura'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default CareersPage;
