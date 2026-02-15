import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DemoModal = ({ demo, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMaximized, setIsMaximized] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!demo || !mounted) return null;

    const goToPrevious = (e) => {
        e.stopPropagation();
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? demo.imageUrls.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (e) => {
        e.stopPropagation();
        const isLast = currentIndex === demo.imageUrls.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const modalContent = (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Modal Content */}
                <motion.div
                    className="bg-[#1A1A1A] w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col md:flex-row max-h-[90vh] relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button (Mobile) */}
                    <button
                        className="absolute top-4 right-4 z-10 md:hidden text-white bg-black/50 rounded-full p-2"
                        onClick={onClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    {/* Image Gallery Section */}
                    <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center group">
                        <div className="relative w-full h-[300px] md:h-[600px]">
                            <img
                                src={demo.imageUrls[currentIndex]}
                                alt={`Demo ${currentIndex + 1}`}
                                className="w-full h-full object-contain cursor-zoom-in"
                                onClick={() => setIsMaximized(true)}
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {demo.imageUrls.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {demo.imageUrls.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                                            onClick={() => goToSlide(index)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/3 p-8 flex flex-col bg-[#1A1A1A] text-white overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-2xl font-bold leading-tight text-white">{demo.title}</div>
                            <button
                                className="hidden md:block text-gray-400 hover:text-white transition-colors"
                                onClick={onClose}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="prose prose-invert max-w-none mb-8 text-gray-300 text-sm leading-relaxed">
                            {demo.description}
                        </div>

                        <div className="mt-auto space-y-4">
                            {demo.link && (
                                <a
                                    href={demo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-[#6366f1] hover:bg-[#5558dd] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Ver Demo Interativa
                                </a>
                            )}
                            <button
                                onClick={() => {
                                    onClose();
                                    setTimeout(() => {
                                        window.location.hash = 'contactos';
                                    }, 100);
                                }}
                                className="block w-full text-center border border-gray-600 hover:border-white text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Entre em contacto
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Maximized View */}
            {isMaximized && (
                <div
                    className="fixed inset-0 z-[110] bg-black flex items-center justify-center"
                    onClick={() => setIsMaximized(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20"
                        onClick={() => setIsMaximized(false)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <img
                        src={demo.imageUrls[currentIndex]}
                        alt="Maximized demo"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default DemoModal;
