import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DemoModal from '../DemoModal';

const DemosSection = () => {
  const demos = useQuery(api.demos.list) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const itemsPerPage = 2; // Show 2 items at a time on desktop as per screenshot

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

  const visibleDemos = demos.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="demos" className="relative py-24 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/image-demos-section.webp"
          alt="Demos Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Demos</h2>
        </div>

        {/* Demos Carousel */}
        <div className="relative max-w-6xl mx-auto mb-20">
          {demos.length > 0 ? (
            <div className="flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-12 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="relative group w-full md:w-[500px] h-[300px] rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-gray-600 transition-colors"
                      onClick={() => setSelectedDemo(demo)}
                    >
                      <img
                        src={demo.imageUrls[0]}
                        alt={demo.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-xl font-bold mb-4 line-clamp-2">{demo.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDemo(demo);
                          }}
                          className="inline-flex items-center bg-[#6366f1] hover:bg-[#5558dd] text-white text-sm font-semibold py-2 px-6 rounded-full transition-colors duration-300"
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
                className="absolute right-0 md:-right-12 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400">Carregando demos...</div>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(demos.length / itemsPerPage) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * itemsPerPage)}
                className={`w-3 h-3 rounded-full transition-colors ${Math.floor(currentIndex / itemsPerPage) === idx ? 'bg-[#6366f1]' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden bg-[#010314]/60 backdrop-blur-md border border-white/10 shadow-2xl max-w-5xl mx-auto">
          <div className="relative z-10 py-16 px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
              Quer ver uma demo personalizada?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-mono text-sm md:text-base">
              Agende uma sessão de 30 minutos para explorarmos como estas<br />
              soluções se aplicam ao seu negócio específico
            </p>
            <Link
              to="/contactos"
              className="bg-[#6366f1] hover:bg-[#5558dd] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block shadow-lg hover:shadow-indigo-500/50"
            >
              Agendar Demo Personalizada
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {selectedDemo && (
        <DemoModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} />
      )}
    </section>
  );
};

export default DemosSection;
