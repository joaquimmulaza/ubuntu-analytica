import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../BackgroundEffect';
// Certifique-se que este caminho está correto para o seu ficheiro sanityClient
import { client } from '../../sanityClient';

const ArticlesSection = () => {
    // 1. Aqui criamos a variável que vai segurar os artigos do Sanity
    // Ela começa vazia ([]) e não com os dados provisórios
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 2. Esta query vai ao Sanity buscar os dados REAIS
        const query = `*[_type == "post"] | order(_createdAt desc)[0...3] {
            _id,
            title,
            publishedAt,
            _createdAt,
            "slug": slug.current,
            // Truque para calcular tempo de leitura baseado no tamanho do texto
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ) + " min"
        }`;

        client.fetch(query)
            .then((data) => {
                console.log("Dados recebidos do Sanity:", data);
                setArticles(data);
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    // Função para formatar a data (ex: 2024-10-05 -> 5 de outubro de 2024)
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
                        Publicações sobre BI, dados e transformação digital para empresas lusófonas
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 mb-20">
                    {/* Se estiver a carregar, mostra uma mensagem simples */}
                    {isLoading && (
                        <div className="w-full text-center text-soft-neon-glow/60 animate-pulse font-body">
                            A carregar artigos...
                        </div>
                    )}

                    {/* Se não houver artigos no Sanity, avisa */}
                    {!isLoading && articles.length === 0 && (
                        <div className="w-full text-center text-neon-coral font-body">
                            Ainda não há artigos publicados no Sanity.
                        </div>
                    )}

                    {/* Aqui fazemos o loop nos artigos REAIS do Sanity */}
                    {!isLoading && articles.map((article, index) => (
                        <motion.div
                            key={article._id}
                            className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-md bg-surface/80 border border-soft-neon-glow/30 rounded-neon p-8 flex flex-col hover:border-electric-blue/60 transition-all duration-300 backdrop-blur-neon hover:shadow-glow-medium"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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

                            <a
                                href={`/post/${article.slug}`}
                                className="w-full bg-gradient-primary rounded-full py-3 px-6 text-center text-sm font-body font-semibold hover:shadow-glow-medium transition-all duration-300 flex items-center justify-center group"
                            >
                                Ler mais
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="bg-surface/80 border border-soft-neon-glow/30 rounded-2xl p-12 text-center max-w-3xl mx-auto backdrop-blur-neon shadow-glow-soft"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-heading font-extrabold mb-2">Ubuntu Analytica</h3>
                    <p className="text-electric-blue font-body text-sm tracking-wider">
                        Data Intelligence para a Lusofonia
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ArticlesSection;