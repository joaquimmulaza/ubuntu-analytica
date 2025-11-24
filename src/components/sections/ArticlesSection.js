import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Certifique-se que este caminho está correto para o seu ficheiro sanityClient
import { client } from '../../sanityClient';
// NOTA: A antiga lista "const articles = [...]" FOI REMOVIDA daqui.

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
                console.log("Dados recebidos do Sanity:", data); // Adicionei isto para confirmar no console
                setArticles(data); // Atualiza a variável 'articles' com os dados reais
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
        <section id="artigos" className="py-24 bg-[#161b22] text-white font-mono">
            <div className="container mx-auto px-6">
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

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Se estiver a carregar, mostra uma mensagem simples */}
                    {isLoading && (
                         <div className="col-span-3 text-center text-gray-500 animate-pulse">
                             A carregar artigos...
                         </div>
                    )}

                    {/* Se não houver artigos no Sanity, avisa */}
                    {!isLoading && articles.length === 0 && (
                        <div className="col-span-3 text-center text-yellow-500">
                            Ainda não há artigos publicados no Sanity.
                        </div>
                    )}

                    {/* Aqui fazemos o loop nos artigos REAIS do Sanity */}
                    {!isLoading && articles.map((article, index) => (
                        <motion.div
                            key={article._id}
                            className="bg-[#0d1117] border border-[#30363d] rounded-xl p-8 flex flex-col hover:border-[#58a6ff] transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-center mb-6 text-xs md:text-sm text-gray-400">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {/* Data dinâmica do Sanity */}
                                    {formatDate(article.publishedAt || article._createdAt)}
                                </div>
                                <div className="flex items-center border border-[#30363d] rounded-full px-3 py-1 text-[#58a6ff] bg-[#58a6ff]/10">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    {/* Tempo de leitura dinâmico */}
                                    {/* Se existir valor, mostra. Se não, mostra "2 min" fixo para não ficar vazio */}
{article.estimatedReadingTime ? article.estimatedReadingTime : "1 min"}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-8 flex-grow leading-tight">
                                {/* Título dinâmico do Sanity */}
                                {article.title}
                            </h3>

                            <a
                                href={`/post/${article.slug}`} // Link dinâmico
                                className="w-full border border-[#30363d] rounded-full py-3 px-6 text-center text-sm hover:bg-[#21262d] transition-colors flex items-center justify-center group"
                            >
                                Ler mais
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </motion.div>
                    ))}
                </div>

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