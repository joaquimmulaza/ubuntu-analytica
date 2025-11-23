import React from 'react';
import { motion } from 'framer-motion';

const founders = [
  {
    name: "Alberto Pedro",
    role: "CEO",
    image: "/img/team/alberto-pedro.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/alberto-pedro-a39a67151/"
  },
  {
    name: "João Baptista",
    role: "CFO",
    image: "/img/team/joao-baptista.webp", // Placeholder
    linkedin: "linkedin.com/in/joão-diassiwa28"
  }
];

const boardMembers = [
  {
    name: "Adilson da Costa",
    role: "Administrador",
    image: "/img/team/adilson-costa.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/adilson-fernando-89313116a/"
  },
  {
    name: "José Alcides",
    role: "Administrador",
    image: "/img/team/jose-alcides.jpg", // Placeholder
    linkedin: "https://www.linkedin.com/in/jos%C3%A9-alcides-246519127/"
  },
  {
    name: "Nirvânia Mendes",
    role: "Administradora",
    image: "/img/team/nirvania-mendes.webp", // Placeholder
    linkedin: "#"
  },
  {
    name: "Antenon Sacambela",
    role: "Administrador",
    image: "/img/team/antenon-sacambela.jpg", // Placeholder
    linkedin: "https://www.linkedin.com/in/antenonsacambela/"
  }
];

const TeamCard = ({ member }) => (
  <motion.div
    className="bg-[#0F111A] p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center hover:border-gray-600 transition-colors duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#1E1E2E] shadow-lg">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f133&color=818cf8`;
        }}
      />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
    <span className="inline-block bg-[#2A2A35] text-[#818CF8] text-xs font-semibold px-3 py-1 rounded-full mb-6">
      {member.role}
    </span>

    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 bg-[#1E1E2E] hover:bg-[#2A2A35] text-gray-300 px-4 py-2 rounded-lg transition-colors text-sm"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
      <span>LinkedIn</span>
    </a>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section id="quem-somos" className="py-24 bg-[#0a0d13fc] text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quem Somos
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Profissionais experientes com paixão por transformar dados em valor para o negócio
          </motion.p>
        </div>

        {/* Fundadores Section */}
        <div className="mb-24">
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Fundadores e Direção Executiva</h3>
            <div className="w-16 h-1 bg-[#6366f1] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>

        {/* Conselho Section */}
        <div>
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Conselho de Administração</h3>
            <div className="w-16 h-1 bg-[#6366f1] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
