import React from 'react';
import { motion } from 'framer-motion';

const articles = [
    {
        id: 1,
        date: "1 de outubro de 2024",
        readTime: "5 min",
        title: "BI e eficiência operacional",
        link: "#"
    },
    {
        id: 2,
        date: "15 de setembro de 2024",
        readTime: "5 min",
        title: "MVP de dados em 4 semanas",
        link: "#"
    },
    {
        id: 3,
        date: "20 de agosto de 2024",
        readTime: "5 min",
        title: "O futuro das decisões em Angola",
        link: "#"
    }
];

const ArticlesSection = () => {
    return (
        <section id="artigos" className="py-24 bg-[#161b22] text-white font-mono">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Artigos
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Publicações sobre BI, dados e transformação digital para empresas lusófonas
                    </motion.p>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            className="bg-[#0d1117] border border-[#30363d] rounded-xl p-8 flex flex-col hover:border-[#58a6ff] transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-center mb-6 text-xs md:text-sm text-gray-400">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {article.date}
                                </div>
                                <div className="flex items-center border border-[#30363d] rounded-full px-3 py-1 text-[#58a6ff] bg-[#58a6ff]/10">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    {article.readTime}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-8 flex-grow leading-tight">
                                {article.title}
                            </h3>

                            <a
                                href={article.link}
                                className="w-full border border-[#30363d] rounded-full py-3 px-6 text-center text-sm hover:bg-[#21262d] transition-colors flex items-center justify-center group"
                            >
                                Ler mais
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Card */}
                <motion.div
                    className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-12 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-2">Ubuntu Analytica</h3>
                    <p className="text-[#58a6ff] font-mono text-sm tracking-wider">
                        Data Intelligence para a Lusofonia
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ArticlesSection;
