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
    <section className="bg-gradient-to-br from-[#1E104E] via-[#2A145A] to-[#0B0B0F] text-white py-20 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left Column */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-1 text-sm mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Bem-Vindo
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Criatividade<br />
            Excelência<br />
            Resultado
          </h1>
          <p className="mt-6 text-lg max-w-lg">
            Ajudamos empresas a desbloquear o poder dos seus dados com soluções de Business Intelligence personalizadas, que agregam valor à tomada de decisões, aumentando a eficiência operacional e impulsionando o crescimento do seu negócio.
          </p>
          <div className="mt-8 flex items-center space-x-4">
            <NavLink to="servicos" className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition">
              Ver Mais
            </NavLink>
            <Link to="/contactos" className="flex items-center space-x-2 hover:text-gray-300">
              {/* Placeholder for phone icon */}
              <span>&#9742;</span>
              <span>Contacte-nos</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column (Placeholder for decorative elements) */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
            <div className="relative w-full h-64 md:h-96">
              <img src='/img/cubos-data.png' alt='cubos-data' className='w-full h-full object-cover'/>
                {/* This is a placeholder for the floating cubes graphic. 
                <div className="absolute top-10 right-20 w-16 h-16 bg-purple-500/50 rounded-lg transform rotate-12"></div>
                <div className="absolute top-24 right-48 w-12 h-12 bg-purple-400/50 rounded-lg transform -rotate-12"></div>
                <div className="absolute top-40 right-10 w-8 h-8 bg-indigo-500/50 rounded-lg transform rotate-45"></div>
                <div className="absolute bottom-10 right-32 w-20 h-20 bg-purple-600/50 rounded-lg transform rotate-6"></div>
                 <div className="absolute top-5 right-5 w-5 h-5 bg-indigo-400/50 rounded-lg transform rotate-12"></div> */}
                {/* <p className="text-center text-gray-500">Elemento Gráfico</p> */}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
