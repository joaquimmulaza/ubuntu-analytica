import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../components/BackgroundEffect';

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
        <div className="min-h-screen bg-midnight-black text-white pt-24 pb-12">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <BackgroundEffect
                    orb1Color="bg-cyber-purple/10"
                    orb2Color="bg-electric-blue/10"
                    orb1Position="top-20 left-20"
                    orb2Position="bottom-20 right-20"
                    gradientFrom="from-midnight-black"
                    gradientVia="via-cyber-purple/5"
                    gradientTo="to-midnight-black"
                />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-extrabold mb-6 text-white"
                    >
                        Junte-se à <span className="text-transparent bg-clip-text bg-gradient-primary">Equipa</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-soft-neon-glow/80 max-w-2xl mx-auto font-body"
                    >
                        Estamos à procura de talentos apaixonados por dados e inovação para transformar o futuro da inteligência de negócios.
                    </motion.p>
                </div>
            </section>

            {/* Application Form Section */}
            <section className="container mx-auto px-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto bg-surface p-8 md:p-12 rounded-neon border border-white/10 backdrop-blur-md shadow-glow-soft"
                >
                    <h2 className="text-2xl font-heading font-bold mb-8 text-center text-white">Formulário de Candidatura</h2>

                    {formStatus === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-neon-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-neon-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Candidatura Enviada!</h3>
                            <p className="text-soft-neon-glow/80 font-body">Obrigado pelo seu interesse. Analisaremos o seu perfil e entraremos em contacto brevemente.</p>
                            <button
                                onClick={() => setFormStatus(null)}
                                className="mt-8 text-electric-blue hover:text-white transition-colors font-body font-semibold"
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
                                    <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Nome Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Telefone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                                        placeholder="+244 9XX XXX XXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">LinkedIn / Portfólio</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Posição a que se candidata *</label>
                                <select
                                    name="position"
                                    required
                                    className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all appearance-none font-body"
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
                                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Carta de Motivação / Mensagem</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                                    placeholder="Conte-nos um pouco sobre si e porque quer juntar-se a nós..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Anexar CV (PDF ou Word) *</label>
                                <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 hover:border-electric-blue transition-colors text-center cursor-pointer group">
                                    <input
                                        type="file"
                                        name="attachment"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <svg className="w-10 h-10 text-soft-neon-glow/50 group-hover:text-electric-blue mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="text-sm text-soft-neon-glow/70 group-hover:text-white transition-colors font-body">
                                            Arraste o ficheiro ou clique para selecionar
                                        </p>
                                        <p className="text-xs text-soft-neon-glow/50 mt-1 font-body">PDF, DOC ou DOCX (Max 5MB)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-glow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
