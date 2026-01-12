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
    name: "João Diassiwa",
    role: "CFO",
    image: "/img/team/joao-baptista.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/joão-diassiwa28"
  }
];

const boardMembers = [
  {
    name: "Nirvânia Mendes",
    role: "Administradora",
    image: "/img/team/nirvania-mendes.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/nirv%C3%A2nia-mendes-014082163"
  },
  {
    name: "Adilson da Costa",
    role: "Administrador",
    image: "/img/team/adilson-costa.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/adilson-fernando-89313116a/"
  },
  {
    name: "David Tombi",
    role: "Administrador",
    image: "/img/team/david-tombi.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/david-tombi1998/"
  },
  {
    name: "Antenon Sacambela",
    role: "Administrador",
    image: "/img/team/antenon-sacambela.webp", // Placeholder
    linkedin: "https://www.linkedin.com/in/antenonsacambela/"
  }
];

const TeamCard = ({ member }) => (
  <motion.div
    className="group relative bg-surface backdrop-blur-md p-8 rounded-neon border border-white/10 flex flex-col items-center text-center hover:border-electric-blue/60 hover:bg-surface/90 transition-all duration-300 hover:shadow-glow-medium overflow-hidden"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/0 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-electric-blue/30 shadow-glow-soft group-hover:border-electric-blue/50 transition-colors duration-300">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3F45FF&color=ffffff`;
        }}
      />
    </div>
    <h3 className="text-xl font-heading font-extrabold text-white mb-2 relative z-10">{member.name}</h3>
    <span className="inline-block bg-cyber-purple/20 text-soft-neon-glow/90 text-xs font-body font-semibold px-3 py-1 rounded-full mb-6 border border-cyber-purple/30 group-hover:border-electric-blue/30 group-hover:text-white transition-colors duration-300 relative z-10">
      {member.role}
    </span>

    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 flex items-center space-x-2 bg-gradient-primary hover:bg-gradient-secondary hover:shadow-glow-medium text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-body font-semibold"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
      <span>LinkedIn</span>
    </a>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section id="quem-somos" className="py-24 bg-midnight-black text-white relative overflow-hidden">
      {/* Background Transition & Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Gradient: Pure Black (matches previous section) -> Blue -> Dark (matches next section) */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-black via-purple-900/10 to-midnight-black"></div>

        {/* Radial Spotlights for "Fog" effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-soft-neon-glow/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quem Somos
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-soft-neon-glow/80 max-w-3xl mx-auto font-body font-light"
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
            <h3 className="text-2xl font-heading font-extrabold mb-2">Fundadores e Direção Executiva</h3>
            <div className="w-16 h-1 bg-gradient-primary rounded-full shadow-glow-soft"></div>
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
            <h3 className="text-2xl font-heading font-extrabold mb-2">Conselho de Administração</h3>
            <div className="w-16 h-1 bg-gradient-primary rounded-full shadow-glow-soft"></div>
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
