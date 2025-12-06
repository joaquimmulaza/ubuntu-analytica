import React from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';
import BackgroundEffect from '../BackgroundEffect';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

const teamMembers = [
  {
    name: "João Diassiwa",
    role: "Founder CFO",
    imageUrl: "/img/ITG_AO_foto_João_Diassiwa__8_-removebg-preview.png",
    bio: "Com +3 anos de experiência nacional e internacional, incluindo Emirados Árabes, destaca-se em Business Intelligence e Engenharia de Dados. Combina técnica e estratégia, impulsionando inovação e foco no cliente. Atuou em Oil & Gás, Banca, Transporte, Energia e Água, promovendo transformação digital. Participou de programas como SAP Young Professional, McKinsey Forward e Aspire Leaders (Harvard/Aspire Institute). Mentor no Jornada de Dados, capacita jovens para BI e Engenharia de Dados."
  },
  {
    name: "Alberto Pedro",
    role: "Founder PCA",
    imageUrl: "/img/Alberto_Pedro-removebg-preview.png",
    bio: "Com +3 anos de experiência nacional e internacional, tendo atuado em Portugal na implementação de soluções de Business Intelligence e Engenharia de Dados. Une uma sólida expertise técnica a uma visão estratégica, com foco em impulsionar o crescimento, a inovação e uma abordagem orientada ao cliente. Tem experiência em projetos nos setores da Banca, Transporte e Ambiental, contribuindo para a modernização de processos, análise de dados e geração de insights para a tomada de decisões."
  }
];

const TeamSection = () => {
  return (
    <motion.section
      id="quem-somos"
      className="py-20 bg-midnight-black relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <BackgroundEffect
        className="opacity-50"
        gradientFrom="from-midnight-black"
        gradientVia="via-purple-900/10"
        gradientTo="to-midnight-black"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-surface border border-white/10 rounded-full px-4 py-1 text-sm mb-4 text-white">
            <span className="w-2 h-2 bg-electric-blue rounded-full mr-2 shadow-glow-soft"></span>
            Equipa
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white">
            Uma equipa com <span className="text-electric-blue text-glow">+3 anos</span> de experiência
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-soft-neon-glow font-body font-light">
            Somos motivados pela visão de satisfazer as necessidades mais exigentes do mercado e entregar valor aos nossos parceiros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card bg-surface/80 border border-white/10 p-6 rounded-neon backdrop-blur-md"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="team-card-image-wrapper mb-6 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-electric-blue shadow-glow-medium bg-midnight-black">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="team-card-content text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-electric-blue font-semibold mb-4">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamSection;
