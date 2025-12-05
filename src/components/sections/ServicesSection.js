import React from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../BackgroundEffect';

const steps = [
  {
    id: 1,
    title: "Descoberta",
    description: "Sessão de 30 minutos para entender objetivos",
    icon: (
      <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: "Blueprint",
    description: "Arquitetura, KPIs e cronograma",
    icon: (
      <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: "MVP",
    description: "Entrega funcional em 2 a 4 semanas",
    icon: (
      <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: "Iterações",
    description: "Melhorias quinzenais com métricas de adoção",
    icon: (
      <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    )
  },
  {
    id: 5,
    title: "Evolução",
    description: "Documentação, formação e roadmap",
    icon: (
      <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    )
  }
];

const ServicesSection = () => {
  return (
    <section id="processos" className="relative py-24 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <BackgroundEffect
        orb1Color="bg-electric-blue/5"
        orb2Color="bg-cyber-purple/5"
        orb1Position="bottom-20 left-20"
        orb2Position="top-20 right-20"
        gradientFrom="from-midnight-black"
        gradientVia="via-blue-900/10"
        gradientTo="to-midnight-black"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            O Nosso Processo
          </h2>
          <p className="text-lg md:text-xl text-soft-neon-glow/80 max-w-3xl mx-auto font-body font-light">
            Metodologia comprovada em 5 passos para garantir o sucesso da sua transformação digital
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-soft-neon-glow/50 to-transparent -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="group relative flex flex-col items-center text-center w-full md:w-1/5 p-4 rounded-2xl transition-all duration-300"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  borderColor: "rgba(255, 255, 255, 0)",
                  y: 0
                },
                hover: {
                  backgroundColor: "rgba(22, 27, 34, 0.8)",
                  borderColor: "rgba(63, 69, 255, 0.3)",
                  y: -10,
                  boxShadow: "0 0 30px rgba(63, 69, 255, 0.15)",
                  backdropFilter: "blur(12px)"
                }
              }}
              style={{ border: '1px solid transparent' }} // Base border for transition
            >
              {/* Step Number Bubble */}
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-heading font-extrabold text-white mb-4 shadow-glow-soft z-10"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.1, boxShadow: "0 0 20px rgba(63, 69, 255, 0.6)" }
                }}
              >
                {step.id}
              </motion.div>

              {/* Icon Box */}
              <motion.div
                className="w-20 h-20 bg-midnight-black/60 backdrop-blur-neon rounded-neon flex items-center justify-center mb-4 border border-soft-neon-glow/30 z-10"
                variants={{
                  rest: { borderColor: "rgba(197, 201, 255, 0.3)", scale: 1 },
                  hover: { borderColor: "rgba(63, 69, 255, 0.8)", scale: 1.05, boxShadow: "0 0 20px rgba(63, 69, 255, 0.3)" }
                }}
              >
                <div className="text-electric-blue">
                  {step.icon}
                </div>
              </motion.div>

              <h3 className="text-xl font-heading font-extrabold mb-2 z-10">{step.title}</h3>

              {/* Description Reveal */}
              <motion.div
                className="overflow-hidden"
                variants={{
                  rest: { opacity: 0, height: 0, marginTop: 0 },
                  hover: { opacity: 1, height: "auto", marginTop: 10 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-sm text-soft-neon-glow/70 leading-relaxed font-body">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow (except for last item) - Positioned absolutely to not be affected by card growth */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-1/2 transform translate-x-1/2 -translate-y-full text-soft-neon-glow/20 pointer-events-none">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pronto para começar? CTA Card */}
        <motion.div
          className="mt-16 relative rounded-xl overflow-hidden bg-midnight-black/60 backdrop-blur-neon border border-soft-neon-glow/30 shadow-glow-medium max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="py-8 px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-extrabold mb-3">
              Pronto para começar?
            </h3>
            <p className="text-base text-soft-neon-glow/80 mb-6 max-w-xl mx-auto font-body">
              Agende a sua sessão de descoberta gratuita e vamos avaliar como podemos ajudar o seu negócio
            </p>
            <a
              href="https://calendly.com/ubuntu-analytica/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-primary hover:shadow-glow-strong text-white font-body font-semibold py-2 px-6 text-sm rounded-full transition-all duration-300 shadow-glow-soft"
            >
              Agendar Sessão de Descoberta <span className="ml-2">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
