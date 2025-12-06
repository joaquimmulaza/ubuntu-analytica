import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DemoModal from '../DemoModal';
import BackgroundEffect from '../BackgroundEffect';

const DemosSection = () => {
  const demos = useQuery(api.demos.list) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 2);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + itemsPerPage >= demos.length) ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - itemsPerPage < 0) ? Math.max(0, demos.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  // Ensure currentIndex is valid when itemsPerPage changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const visibleDemos = demos.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="demos" className="relative py-24 text-white overflow-hidden">
      {/* Background Image */}
      <BackgroundEffect
        orb1Color="bg-indigo-500/5"
        orb2Color="bg-pink-500/5"
        orb1Position="top-1/4 -left-20"
        orb2Position="bottom-1/4 -right-20"
        gradientFrom="from-midnight-black"
        gradientVia="via-indigo-900/10"
        gradientTo="to-midnight-black"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Demos</h2>
        </div>

        {/* Demos Carousel */}
        <div className="relative max-w-6xl mx-auto mb-16">
          {demos.length > 0 ? (
            <div className="flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-12 z-20 p-2 rounded-full bg-surface/60 hover:bg-electric-blue/20 backdrop-blur-neon transition-all duration-300 border border-soft-neon-glow/30 hover:border-electric-blue/60 hover:shadow-glow-soft"
              >
                <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
                <AnimatePresence mode='wait'>
                  {visibleDemos.map((demo) => (
                    <motion.div
                      key={demo._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="relative group w-full md:w-[500px] h-[300px] rounded-neon overflow-hidden cursor-pointer border border-soft-neon-glow/30 hover:border-electric-blue/60 transition-all duration-300 hover:shadow-glow-medium"
                      onClick={() => setSelectedDemo(demo)}
                    >
                      <img
                        src={demo.imageUrls[0]}
                        alt={demo.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-xl font-heading font-extrabold mb-4 line-clamp-2 text-white">{demo.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDemo(demo);
                          }}
                          className="inline-flex items-center bg-gradient-primary hover:shadow-glow-medium text-white text-sm font-body font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-glow-soft"
                        >
                          Ver detalhe
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 md:-right-12 z-20 p-2 rounded-full bg-surface/60 hover:bg-electric-blue/20 backdrop-blur-neon transition-all duration-300 border border-soft-neon-glow/30 hover:border-electric-blue/60 hover:shadow-glow-soft"
              >
                <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center text-soft-neon-glow/70">Carregando demos...</div>
          )}
        </div>

        {/* CTA Card - Separated for better spacing */}
        <div className="relative rounded-xl overflow-hidden bg-surface/60 backdrop-blur-neon border border-soft-neon-glow/30 shadow-glow-medium max-w-4xl mx-auto">
          <div className="relative z-10 py-8 px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-extrabold mb-3">
              Quer ver uma demo personalizada?
            </h3>
            <p className="text-soft-neon-glow/80 mb-6 max-w-xl mx-auto font-body text-base">
              Agende uma sessão de 30 minutos para explorarmos como estas<br />
              soluções se aplicam ao seu negócio específico
            </p>
            <Link
              to="/contactos"
              className="bg-gradient-primary hover:shadow-glow-strong text-white font-body font-semibold py-2 px-6 text-sm rounded-full transition-all duration-300 inline-block shadow-glow-soft"
            >
              Agendar Demo Personalizada
            </Link>
          </div>
        </div>

        {/* Demo Modal */}
        {selectedDemo && (
          <DemoModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} />
        )}
      </div>
    </section>
  );
};

export default DemosSection;
