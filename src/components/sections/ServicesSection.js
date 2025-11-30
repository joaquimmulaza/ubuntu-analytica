import React from 'react';
import { motion } from 'framer-motion';

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
      <div className="absolute inset-0 z-0">
        <img
          src="/img/image-nosso-processo-section.webp"
          alt="Process Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

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
              className="flex flex-col items-center text-center w-full md:w-1/5 px-2 mb-12 md:mb-0 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Step Number Bubble */}
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-heading font-extrabold text-white mb-4 shadow-glow-soft z-10">
                {step.id}
              </div>

              {/* Icon Box */}
              <div className="w-20 h-20 bg-midnight-black/60 backdrop-blur-neon rounded-neon flex items-center justify-center mb-6 border border-soft-neon-glow/30 hover:border-electric-blue/60 transition-all duration-300 group hover:shadow-glow-medium">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-heading font-extrabold mb-3">{step.title}</h3>
              <p className="text-sm text-soft-neon-glow/70 leading-relaxed px-2 font-body">
                {step.description}
              </p>

              {/* Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-1/2 transform translate-x-1/2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pronto para começar? CTA Card */}
        <motion.div
          className="mt-20 relative rounded-2xl overflow-hidden bg-midnight-black/60 backdrop-blur-neon border border-soft-neon-glow/30 shadow-glow-medium max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="py-12 px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-lg text-soft-neon-glow/80 mb-8 max-w-2xl mx-auto font-body">
              Agende a sua sessão de descoberta gratuita e vamos avaliar como podemos ajudar o seu negócio
            </p>
            <a
              href="https://calendly.com/ubuntu-analytica/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-primary hover:shadow-glow-strong text-white font-body font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-glow-soft"
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
