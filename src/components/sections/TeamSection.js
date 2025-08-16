import React from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';

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
      className="py-20 bg-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gray-200 rounded-full px-4 py-1 text-sm mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Equipa
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Uma equipa com <span className="text-purple-600">+3 anos</span> de experiência
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Somos motivados pela visão de satisfazer as necessidades mais exigentes do mercado e entregar valor aos nossos parceiros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="team-card-image-wrapper">
                <img src={member.imageUrl} alt={member.name} />
              </div>
              <div className="team-card-content">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-purple-400 mb-4">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamSection;
