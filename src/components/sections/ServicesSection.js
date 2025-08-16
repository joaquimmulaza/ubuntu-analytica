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

const services = [
  {
    icon: "/img/lightbulb-solid.svg",
    alt: "Consultoria Icon",
    title: "Consultoria em Business Intelligence",
    description: "Desenhamos soluções estratégicas alinhadas aos seus objetivos de negócio, identificando oportunidades e pontos de melhoria através da análise de dados.",
    tools: []
  },
  {
    icon: "/img/chart-line-solid.svg",
    alt: "Dashboards Icon",
    title: "Desenvolvimento de Dashboards e Visualizações Interativas",
    description: "Construímos dashboards intuitivos e relatórios dinâmicos com ferramentas líderes como Power BI, Tableau e Metabase, facilitando o acompanhamento de KPIs e a tomada de decisão em tempo real.",
    tools: [
      { src: "/img/power-bi-icon.svg", alt: "Power BI" },
      { src: "/img/metabase-svgrepo-com.svg", alt: "Metabase" },
      { src: "/img/tableau-icon-svgrepo-com.svg", alt: "Tableau" }
    ]
  },
  {
    icon: "/img/diagram-project-solid.svg",
    alt: "ETL Icon",
    title: "ETL e Integração de Dados",
    description: "Criamos pipelines de dados confiáveis e eficientes utilizando ferramentas modernas de integração como:",
    tools: [
      { src: "/img/Hop-logo.svg", alt: "Apache Hop" },
      { src: "/img/pentaho_logo.png", alt: "Pentaho" },
      { src: "/img/msql-server-svgrepo-com.svg", alt: "SQL Server" },
      { src: "/img/python-svgrepo-com.svg", alt: "Python" }
    ]
  },
  {
    icon: "/img/shield-halved-solid.svg",
    alt: "Governança Icon",
    title: "Governança e Qualidade de Dados",
    description: "Estabelecemos políticas, processos e tecnologias para garantir que os dados utilizados estejam completos, corretos e em conformidade com normas e regulamentações.",
    tools: []
  },
  {
    icon: "/img/network-wired-solid.svg",
    alt: "Big Data Icon",
    title: "Big Data e Processamento Massivo",
    description: "Para ambientes de grande volume e alta complexidade, empregamos tecnologias como:",
    tools: [
      { src: "/img/Apache Spark.svg", alt: "Apache Spark" },
      { src: "/img/hadoop-svgrepo-com.svg", alt: "Hadoop" },
      { src: "/img/kafka-icon-svgrepo-com.svg", alt: "Kafka" }
    ],
    footerText: "Permitindo análises rápidas, escaláveis e distribuídas."
  },
  {
    icon: "/img/database-solid.svg",
    alt: "Data Warehousing Icon",
    title: "Data Warehousing",
    description: "Implementamos soluções de Data Warehouse para ambientes que exigem centralização e integração de dados, com armazenamento estruturado e suporte à análise histórica. Empregamos tecnologias como:",
    tools: [
      { src: "/img/msql-server-svgrepo-com.svg", alt: "SQL Server" },
      { src: "/img/Postgresql_elephant.svg", alt: "PostgreSQL" }
    ],
    footerText: "Permitindo integração eficiente, centralização confiável e geração de insights estratégicos a partir de grandes volumes de dados."
  }
];

const ServicesSection = () => {
  return (
    <motion.section
      id="servicos"
      className="py-20 bg-[#0B0B0F] text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-1 text-sm mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Serviços
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Os melhores recursos para<br />impulsionar o seu negócio
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-[#1A1A1A] p-8 rounded-lg flex flex-col" 
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                  <img src={service.icon} alt={service.alt} className="h-6"/>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>
              {service.tools.length > 0 && (
                <div className="flex items-center space-x-4 mb-4">
                  {service.tools.map((tool, toolIndex) => (
                    <img key={toolIndex} src={tool.src} alt={tool.alt} className="h-6"/>
                  ))}
                </div>
              )}
              {service.footerText && (
                <p className="text-gray-400">{service.footerText}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
