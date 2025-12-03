import React, { useCallback } from 'react';
import BackgroundEffect from '../BackgroundEffect';
import { Link } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';



  const NavLink = ({ to, children, className }) => {
    return isHomePage ? (
      <ScrollLink to={to} smooth={true} duration={500} className={className}>
        {children}
      </ScrollLink>
    ) : (
      <RouterLink to={`/#${to}`} className={className}>
        {children}
      </RouterLink>
    );
  };
  return (
    <section className="relative h-screen text-white overflow-hidden">
      <BackgroundEffect
        gradientFrom="from-black"
        gradientVia="via-purple-900/20"
        gradientTo="to-midnight-black"
      />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-4">
            Transformamos dados em<br />decisões
          </h1>
          <p className="text-xl md:text-2xl font-body font-light mb-10 tracking-wide text-soft-neon-glow">
            Business Intelligence & Data Engineering
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
            <NavLink
              to="contactos"
              className="w-56 bg-gradient-primary text-white font-body font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center shadow-glow-soft hover:shadow-glow-medium hover:-translate-y-0.5 cursor-pointer"
            >
              Começar Projeto <span className="ml-2">→</span>
            </NavLink>
            <NavLink
              to="demos"
              className="w-56 bg-transparent border-2 border-soft-neon-glow/50 hover:border-electric-blue text-white font-body font-semibold py-[10px] px-[30px] rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-glow-soft hover:bg-electric-blue/10 cursor-pointer"
            >
              <span className="mr-2">▷</span> Ver Demos
            </NavLink>
          </div>

          <div className="text-sm text-soft-neon-glow/80 font-body">
            <p className="mb-2 uppercase tracking-wider text-xs text-soft-neon-glow/60 font-semibold">Stack Tecnológico:</p>
            <p className="font-light">Power BI • Tableau • Metabase • Python • Data Engineering (Kafka, Apache Hop, Pentaho)</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs mb-2 text-soft-neon-glow/70 font-body font-semibold">Descobrir mais</span>
          <div className="w-6 h-10 border-2 border-soft-neon-glow/50 rounded-full flex justify-center p-1 shadow-glow-soft">
            <motion.div
              className="w-1 h-2 bg-electric-blue rounded-full shadow-glow-soft"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
