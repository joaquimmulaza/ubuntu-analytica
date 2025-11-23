import React from 'react';
import { Link } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const NavLink = ({ to, children }) => {
    return isHomePage ? (
      <ScrollLink to={to} smooth={true} duration={500} className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition cursor-pointer">
        {children}
      </ScrollLink>
    ) : (
      <RouterLink to={`/#${to}`} className="hover:text-gray-300">
        {children}
      </RouterLink>
    );
  };
  return (
    <section className="relative h-screen text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/hero-main.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Transformamos dados em<br />decisões
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 tracking-wide">
            Business Intelligence & Data Engineering
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
            <RouterLink
              to="/contactos"
              className="bg-[#6366f1] hover:bg-[#5558dd] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center"
            >
              Começar Projeto <span className="ml-2">→</span>
            </RouterLink>
            <RouterLink
              to="/demos"
              className="bg-transparent border border-gray-500 hover:border-white text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center"
            >
              <span className="mr-2">▷</span> Ver Demos
            </RouterLink>
          </div>

          <div className="text-sm text-gray-300 font-mono">
            <p className="mb-2 uppercase tracking-wider text-xs text-gray-400">Stack Tecnológico:</p>
            <p>Power BI • Tableau • Metabase • Python • Data Engineering (Kafka, Apache Hop, Pentaho)</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs mb-2 text-gray-400">Descobrir mais</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
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
