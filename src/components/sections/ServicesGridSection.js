import React from 'react';
import { motion } from 'framer-motion';
import BackgroundEffect from '../BackgroundEffect';
import { useTheme } from '../../context/ThemeContext';

const services = [
    {
        id: 'data-engineering',
        title: 'Data Engineering - Engenharia de Dados',
        shortDesc: 'Pipelines, integrações e arquiteturas de dados que suportam decisões críticas.',
        longDesc: 'À medida que uma empresa cresce, os dados começam a vir de múltiplas fontes — aplicações diferentes (Primavera, CRM, ERP internos, Sistemas de Facturação, SAFT), folhas de Excel, ficheiros CSV/TXT, e sistemas antigos e novos que não se comunicam.',
        image: '/img/services/data-engineering.png',
    },
    {
        id: 'data-governance',
        title: 'Data Governance & Data Quality',
        shortDesc: 'Estruturas de controlo, qualidade e segurança que asseguram confiança total na informação.',
        longDesc: 'Ter dados não é suficiente é preciso garantir que são compreendidos, confiáveis, rastreáveis e utilizados de forma consistente em toda a organização.',
        image: '/img/services/data-governance.png',
    },
    {
        id: 'bi',
        title: 'Business Intelligence',
        shortDesc: 'Dashboards e análises avançadas que tornam os dados claros, úteis e acionáveis.',
        longDesc: 'Muitas empresas recolhem dados… mas não conseguem extrair significado.',
        image: '/img/services/business-intelligence.png',
    },
    {
        id: 'big-data',
        title: 'Big Data',
        shortDesc: 'Processamento massivo e em tempo real para empresas que precisam escalar sem limites.',
        longDesc: 'Quando o volume e a velocidade dos dados aumentam, as ferramentas tradicionais deixam de acompanhar. Consultas ficam lentas, relatórios travam e a operação perde capacidade de resposta.',
        image: '/img/services/big-data.png',
    },
    {
        id: 'data-science',
        title: 'Data Science & Inteligência Artificial',
        shortDesc: 'Modelos analíticos e IA aplicada que geram previsões, automação e vantagem competitiva.',
        longDesc: 'Com IA baseada em dados confiáveis e alinhada ao negócio, a empresa consegue: Antecipar riscos e oportunidades em vendas, operações e clientes;',
        image: '/img/services/data-science-ai.png',
    },
];



const ServicesGridSection = () => {
    // This section is always dark/white text due to the nature of the cards
    return (
        <section id="servicos" className="relative py-24 overflow-hidden text-white bg-midnight-black">
            {/* Background Effect */}
            <BackgroundEffect
                orb1Color="bg-neon-purple/5"
                orb2Color="bg-electric-blue/5"
                orb1Position="top-20 right-20"
                orb2Position="bottom-20 left-20"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-heading font-extrabold mb-6 text-white"
                    >
                        Serviços
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl max-w-3xl mx-auto font-body font-light text-soft-neon-glow/80"
                    >
                        Os melhores recursos para impulsionar o seu negócio
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-glow-soft hover:shadow-glow-medium transition-shadow duration-300"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
            />

            {/* Overlay - Transparent by default, becomes Liquid Glass on hover */}
            <div
                className="absolute inset-0 bg-transparent transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-white/5 group-hover:via-white/5 group-hover:to-black/60 group-hover:backdrop-blur-md border duration-500 border-transparent group-hover:border-white/20"
            />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Title */}
                <h3 className="text-2xl font-heading font-bold !text-[#ffffff] mb-2 relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-md">
                    {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-base !text-[#ffffff]/90 font-body mb-4 relative z-10  transition-colors duration-300 drop-shadow-md">
                    {service.shortDesc}
                </p>

                {/* Long Description and Divider line - Reveal on Hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                        <div className="pt-4 border-t border-electric-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                            <p className="text-sm !text-[#ffffff]/90 font-body leading-relaxed drop-shadow-sm">
                                {service.longDesc}
                            </p>
                            <div className="mt-4 flex items-center text-neon-coral text-sm font-semibold drop-shadow-md">
                                Saber mais
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServicesGridSection;
