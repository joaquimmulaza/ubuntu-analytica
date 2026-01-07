import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../BackgroundEffect';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Por favor, introduza o seu nome.";
    if (!formData.email.trim()) return "Por favor, introduza o seu email.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Por favor, introduza um email válido.";
    if (!formData.message.trim()) return "Por favor, escreva a sua mensagem.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    // Prepare template parameters matching the user's request context if needed, 
    // but usually keys must match the EmailJS template variables.
    // Assuming template variables are: user_name, user_email, company, phone, message
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
      to_email: 'recursoshumanos@ubuntuanalytica.ao' // Explicit instruction for destination
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      toast.success('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contactos" className="py-24 text-white relative overflow-hidden">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#161b22',
          color: '#fff',
          border: '1px solid rgba(63, 69, 255, 0.2)',
        },
      }} />
      <BackgroundEffect
        orb1Color="bg-electric-blue/5"
        orb2Color="bg-neon-coral/5"
        orb1Position="top-1/2 left-1/4 -translate-y-1/2"
        orb2Position="bottom-20 right-20"
        gradientFrom="from-midnight-black"
        gradientVia="via-blue-900/10"
        gradientTo="to-midnight-black"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contactos
          </motion.h2>
          <motion.p
            className="text-soft-neon-glow/80 max-w-2xl mx-auto font-body text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pronto para transformar os seus dados em insights acionáveis?<br />Entre
            em contacto connosco
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          {/* Left Column - Form */}
          <motion.div
            className="bg-surface p-6 md:p-8 rounded-neon border border-white/10 shadow-glow-soft relative overflow-hidden w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-center mb-6 relative z-10">
              <svg className="w-6 h-6 text-electric-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              <h3 className="text-xl font-heading font-extrabold text-white">Enviar Mensagem</h3>
            </div>
            <p className="text-soft-neon-glow/70 mb-8 text-sm font-body relative z-10">
              Deixe-nos uma mensagem e responderemos rapidamente.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                  placeholder="Sua empresa"
                />
              </div>

              <div>
                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Telefone (opcional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                  placeholder="+244 ..."
                />
              </div>

              <div>
                <label className="block text-xs font-body font-semibold text-soft-neon-glow/70 mb-2">Mensagem *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-surface border border-soft-neon-glow/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:shadow-glow-soft transition-all font-body placeholder-soft-neon-glow/50"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center shadow-glow-soft ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    Enviar mensagem
                  </>
                )}
              </button>
            </form>
          </motion.div>
          {/* Right Column */}
          <div className="flex flex-col gap-8 w-full">
            {/* Calendly Card */}
            <motion.div
              className="bg-surface/80 p-6 md:p-8 rounded-neon border border-white/10 backdrop-blur-md shadow-glow-soft w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-electric-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <h3 className="text-xl font-heading font-extrabold text-white">Agendar Sessão</h3>
              </div>
              <p className="text-soft-neon-glow/70 mb-6 text-sm font-body">
                Escolha um horário conveniente para uma chamada de 30 minutos.
              </p>
              <a
                href="https://calendly.com/ubuntu-analytica/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-electric-blue hover:shadow-glow-medium text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center mb-4 border border-electric-blue/50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Abrir Calendly
              </a>
              <p className="text-center text-xs text-soft-neon-glow/60 font-mono">
                Link será enviado por email após agendamento
              </p>
            </motion.div>

            {/* Info Card */}
            <motion.div
              className="bg-surface/80 p-6 md:p-8 rounded-neon border border-white/10 backdrop-blur-md shadow-glow-soft flex-1 w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-heading font-extrabold mb-8 text-white">Contactos</h3>

              <div className="space-y-6 text-sm font-body contact-details-list">
                <div className="flex items-start">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 mr-4">
                    <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-white">recursoshumanos@ubuntuanalytica.ao</p>
                    <p className="text-soft-neon-glow/60 text-xs">Email</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 mr-4">
                    <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-white">+244 953 279 248</p>
                    <p className="text-soft-neon-glow/60 text-xs">Telefone</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 mr-4">
                    <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-white">+325 929 078 394</p>
                    <p className="text-soft-neon-glow/60 text-xs">Telefone</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 mr-4">
                    <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-white">Segunda a Sexta: 9h - 18h</p>
                    <p className="text-soft-neon-glow/60 text-xs">Horário de atendimento</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-soft-neon-glow/60 text-xs font-body mb-4">Redes Sociais</p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/ubuntu-analytica" target="_blank" rel="noopener noreferrer" className="bg-electric-blue/5 p-3 rounded-lg border border-electric-blue/10 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/30 transition-all hover:shadow-glow-soft">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/ubuntuanalytica" target="_blank" rel="noopener noreferrer" className="bg-electric-blue/5 p-3 rounded-lg border border-electric-blue/10 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/30 transition-all hover:shadow-glow-soft">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
