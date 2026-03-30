import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackgroundEffect from '../BackgroundEffect';
import FuturisticSpinner from '../FuturisticSpinner';
import { client } from '../../sanityClient';

const ArticlesSection = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 3);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset index when itemsPerPage changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [itemsPerPage]);

    useEffect(() => {
        const query = `*[_type == "post"] | order(_createdAt desc) {
            _id,
            title,
            publishedAt,
            _createdAt,
            "slug": slug.current,
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ) + " min"
        }`;

        client.fetch(query)
            .then((data) => {
                console.log("Dados recebidos do Sanity:", data);
                setArticles(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao carregar artigos:", err);
                setError("Não foi possível carregar os artigos. Verifique a consola para mais detalhes.");
                setIsLoading(false);
            });
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + itemsPerPage >= articles.length) ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - itemsPerPage < 0) ? Math.max(0, articles.length - itemsPerPage) : prevIndex - itemsPerPage
        );
    };

    const visibleArticles = articles.slice(currentIndex, currentIndex + itemsPerPage);

    const formatDate = (dateString) => {
        if (!dateString) return "Data desconhecida";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-AO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <section id="artigos" className="py-24 text-white relative overflow-hidden">
            <BackgroundEffect
                orb1Color="bg-cyber-purple/5"
                orb2Color="bg-neon-coral/5"
                orb1Position="top-20 left-20"
                orb2Position="bottom-20 right-20"
            />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Artigos
                    </motion.h2>
                    <motion.p
                        className="text-soft-neon-glow/80 max-w-2xl mx-auto font-body font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Publicações sobre BI, dados e transformação digital para empresas
                    </motion.p>
                </div>

                {/* Articles Carousel */}
                <div className="relative max-w-6xl mx-auto mb-16">
                    {isLoading && (
                        <div className="w-full flex justify-center py-12">
                            <FuturisticSpinner />
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="w-full text-center text-neon-coral font-body py-12">
                            {error}
                        </div>
                    )}

                    {!isLoading && !error && articles.length === 0 && (
                        <div className="w-full text-center text-neon-coral font-body py-12">
                            Ainda não há artigos publicados.
                        </div>
                    )}

                    {!isLoading && !error && articles.length > 0 && (
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

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                <AnimatePresence mode="wait">
                                    {visibleArticles.map((article) => (
                                        <motion.div
                                            key={article._id}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-surface/80 border border-soft-neon-glow/30 rounded-neon p-8 flex flex-col hover:border-electric-blue/60 transition-all duration-300 backdrop-blur-neon hover:shadow-glow-medium"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="flex justify-between items-center mb-6 text-xs md:text-sm text-soft-neon-glow/70 font-body">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    {formatDate(article.publishedAt || article._createdAt)}
                                                </div>
                                                <div className="flex items-center border border-electric-blue/50 rounded-full px-3 py-1 text-electric-blue bg-electric-blue/10 shadow-glow-soft">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    {article.estimatedReadingTime ? article.estimatedReadingTime : "1 min"}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-heading font-extrabold mb-8 flex-grow leading-tight">
                                                {article.title}
                                            </h3>

                                            {article.slug ? (
                                                <Link
                                                    to={`/post/${article.slug}`}
                                                    className="w-full bg-gradient-primary rounded-full py-3 px-6 text-center text-sm font-body font-semibold hover:shadow-glow-medium transition-all duration-300 flex items-center justify-center group"
                                                >
                                                    Ler mais
                                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                </Link>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="w-full bg-gray-600 rounded-full py-3 px-6 text-center text-sm font-body font-semibold opacity-50 cursor-not-allowed flex items-center justify-center"
                                                >
                                                    Indisponível (Sem Slug)
                                                </button>
                                            )}
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
                    )}
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;