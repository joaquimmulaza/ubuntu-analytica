import React from 'react';
import { motion } from 'framer-motion';

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
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const AboutSection = () => {
  return (
    <motion.section
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
            Ubuntu Analytica
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Impulsionamos negócios<br />na era digital
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            Trabalhamos para impulsionar a inovação no local de trabalho, potenciando e entregando valor tangível e sustentável ao negócio dos nossos parceiros, com a diferença que nos distingue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Valores */}
          <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200" 
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              {/* Placeholder for icon */}
              <div className="w-12 h-12 flex items-center justify-center mr-4">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#907ee9" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg>
              </div>
              <h3 className="text-2xl font-bold">Valores</h3>
            </div>
            <p className="text-gray-600">
              Ser uma referência em Business Intelligence no mercado angolano, reconhecidos pela excelência na entrega de soluções personalizadas e de alta qualidade, que maximizam o valor dos dados dos nossos clientes. A médio e longo prazo, queremos contribuir ativamente para o fortalecimento de uma cultura data-driven em Angola, promovendo a tomada de decisões baseada em dados em todos os setores.
            </p>
          </motion.div>

          {/* Card Missão */}
          <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200" 
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              {/* Placeholder for icon */}
              <div className="w-12 h-12 flex items-center justify-center mr-4">
                 <img src="/img/target-hit-succeed-aim-svgrepo-com.svg" alt="Missão Icon"/>
              </div>
              <h3 className="text-2xl font-bold">Missão</h3>
            </div>
            <p className="text-gray-600">
              Transformar dados em soluções inteligentes que capacitam as empresas angolanas a tomarem decisões ágeis e baseadas em evidências. Nosso propósito é impulsionar a eficiência operacional, fomentar a inovação e promover o crescimento sustentável dos nossos clientes, contribuindo para o desenvolvimento económico e tecnológico de Angola.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
