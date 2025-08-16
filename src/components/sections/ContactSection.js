import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ContactSection = () => {
  return (
    <motion.section
      id="contactos"
      className="py-20 bg-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-[#1E104E] via-[#2A145A] to-[#0B0B0F] text-white p-12 rounded-lg text-center">
          <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-1 text-sm mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Vamos Começar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Vamos falar sobre<br />o seu Negócio
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Entre em contacto, e juntos vamos impulsionar o seu negócio para o caminho do sucesso.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Link to="/contactos" className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition">
              Vamos Começar
            </Link>
            <Link to="/contactos" className="flex items-center space-x-2 hover:text-gray-300">
              <span>&#9742;</span>
              <span>Contacte-nos</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
