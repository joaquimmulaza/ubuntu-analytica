import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Para pegar o slug da URL
import { client, urlFor } from "../sanityClient"; // Ajusta o caminho se necessário (ex: ../../sanityClient)
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import FuturisticSpinner from "./FuturisticSpinner";

// Configuração de estilo para o texto rico (Portable Text)
// Configuração de estilo para o texto rico (Portable Text)
const postComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).url()}
        alt={value.alt || "Imagem do artigo"}
        className="w-full h-auto rounded-xl my-8 border border-theme-secondary/20"
      />
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-10 mb-4 text-theme-text">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-electric-blue">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-theme-text">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 text-theme-secondary dark:text-gray-300 leading-relaxed text-lg">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-electric-blue pl-4 italic my-6 text-theme-secondary dark:text-gray-300 bg-theme-surface p-4 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Configuração para links externos
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target="_blank" // Abre em nova aba
          className="text-electric-blue hover:underline decoration-2 underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
    // Configuração para texto em Negrito (strong)
    strong: ({ children }) => <strong className="font-bold text-theme-text">{children}</strong>,
    // Configuração para Itálico (em)
    em: ({ children }) => <em className="italic text-theme-secondary dark:text-gray-300">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-theme-secondary dark:text-gray-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-theme-secondary dark:text-gray-300">{children}</ol>,
  },
};

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams(); // Pega o slug da URL (ex: /post/o-meu-artigo)

  useEffect(() => {
    // Busca o artigo específico pelo slug
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      _createdAt,
      name,
      body
    }`;

    setIsLoading(true);
    client.fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar artigo:", err);
        setError("Não foi possível carregar o artigo.");
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center"><FuturisticSpinner /></div>;

  if (error) return <div className="text-center py-20 bg-surface text-neon-coral">{error} <br /> <span className="text-sm text-theme-secondary">Verifique a consola se for o desenvolvedor.</span></div>;

  if (!post) return <div className="text-center py-20 bg-surface text-theme-text">Artigo não encontrado.</div>;

  return (
    <div className="bg-surface min-h-screen text-theme-text font-mono pt-24 pb-12 transition-colors duration-300">
      <Helmet>
        <title>{post.title} | Ubuntu Analytica</title>
        <meta name="description" content={`Leia sobre ${post.title} na Ubuntu Analytica.`} />
      </Helmet>
      <motion.article
        className="container mx-auto px-6 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Botão Voltar */}
        <Link to="/" className="inline-flex items-center text-electric-blue hover:text-theme-text mb-8 transition-colors">
          ← Voltar para a Home
        </Link>

        {/* Cabeçalho do Artigo */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-theme-text">{post.title}</h1>

          <div className="flex items-center text-theme-secondary text-sm mb-8 border-b border-theme-secondary/20 pb-8">
            <span className="mr-4">
              {/* Lógica de Correção: Usa publishedAt OU _createdAt */}
              📅 {new Date(post.publishedAt || post._createdAt).toLocaleDateString('pt-AO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
              }
            </span>
          </div>

          {/* Imagem Principal */}
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.title}
              className="w-full object-cover rounded-2xl shadow-2xl mb-10 border border-theme-secondary/20"
            />
          )}
        </header>

        {/* Conteúdo do Artigo */}
        <div className="prose prose-invert max-w-none prose-p:text-theme-secondary dark:prose-p:text-gray-300 prose-headings:text-theme-text prose-li:text-theme-secondary dark:prose-li:text-gray-300 prose-strong:text-theme-text">
          <PortableText value={post.body} components={postComponents} />
        </div>

      </motion.article>
    </div>
  );
}