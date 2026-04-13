import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../components/BackgroundEffect';
import { useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";

const CareersPage = () => {
    const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'
    const [selectedFile, setSelectedFile] = useState(null);

    const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
    const sendCareerApplication = useAction(api.emails.sendCareerApplication);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        } else {
            setSelectedFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formElement = e.target;
        const formData = new FormData(formElement);
        const attachment = formData.get('attachment');

        try {
            // 1. Get Upload URL from Convex
            const postUrl = await generateUploadUrl();

            // 2. Upload file to Convex Storage
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": attachment.type },
                body: attachment,
            });

            if (!result.ok) throw new Error("Falha no upload do ficheiro.");
            const { storageId } = await result.json();

            // 3. Send application email via Resend (Convex Action)
            await sendCareerApplication({
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                portfolio: formData.get('portfolio'),
                position: formData.get('position'),
                message: formData.get('message'),
                cvStorageId: storageId,
            });

            setFormStatus('success');
            setSelectedFile(null);
            formElement.reset();
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
                                onClick={() => {
                                    setFormStatus(null);
                                    setSelectedFile(null);
                                }}
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
                                <div className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 text-center cursor-pointer group ${selectedFile ? 'border-neon-coral bg-neon-coral/5 shadow-glow-soft' : 'border-white/10 hover:border-electric-blue'}`}>
                                    <input
                                        type="file"
                                        name="attachment"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <motion.div
                                            initial={false}
                                            animate={selectedFile ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                                            className="mb-3"
                                        >
                                            {selectedFile ? (
                                                <svg className="w-10 h-10 text-neon-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-10 h-10 text-soft-neon-glow/50 group-hover:text-electric-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                </svg>
                                            )}
                                        </motion.div>
                                        
                                        <motion.p 
                                            key={selectedFile ? 'file-selected' : 'no-file'}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`text-sm font-body transition-colors ${selectedFile ? 'text-white font-bold' : 'text-soft-neon-glow/70 group-hover:text-white'}`}
                                        >
                                            {selectedFile ? selectedFile : 'Arraste o ficheiro ou clique para selecionar'}
                                        </motion.p>
                                        
                                        <p className="text-xs text-soft-neon-glow/50 mt-1 font-body">
                                            {selectedFile ? 'Ficheiro selecionado com sucesso' : 'PDF, DOC ou DOCX (Max 5MB)'}
                                        </p>
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
