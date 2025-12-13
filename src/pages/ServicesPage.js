import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import BackgroundEffect from '../components/BackgroundEffect';

const services = [
    {
        id: 'data-engineering',
        title: 'Data Engineering',
        subtitle: 'Engenharia de Dados',
        shortDesc: 'Pipelines, integrações e arquiteturas que suportam decisões críticas.',
        // Extended content for refactored UI
        introduction: [
            'À medida que uma empresa cresce, os dados começam a vir de múltiplas fontes — aplicações diferentes (Primavera, CRM, ERP internos, Sistemas de Facturação, SAFT), folhas de Excel, ficheiros CSV/TXT, e sistemas antigos e novos que não se comunicam.',
            'É aqui que surgem duplicações, inconsistências, retrabalho e falta de confiança nos números que suportam o negócio.',
            'A Ubuntu Analytica entra para dar estrutura, coerência e confiança aos seus dados.'
        ],
        mainFeaturesTitle: 'O que fazemos:',
        mainFeatures: [
            'Criamos pipelines e arquiteturas modernas que recolhem, tratam, validam e organizam a informação de ponta a ponta.',
            'Garantimos que tudo flui com segurança, consistência e sem falhas.'
        ],
        challengesTitle: 'Resolvemos desafios como:',
        challenges: [
            'Dados espalhados em múltiplos sistemas',
            'Processos manuais lentos e sujeitos a erro',
            'Falta de integração entre plataformas',
            'Dificuldade em consolidar informação de diferentes departamentos',
            'Atualizações de dados pouco confiáveis e sem histórico'
        ],
        valueTitle: 'Valor para o seu negócio',
        value: [
            'Os seus dados passam a fluir de forma automática, padronizada e validada.',
            'Integramos todas as fontes num Data Warehouse moderno, que se torna a sua fonte única de verdade permitindo análises rápidas, relatórios confiáveis, redução de custos operacionais e decisões de alto impacto baseadas em dados sólidos.'
        ],
        image: '/img/services/data-engineering.png',
        // Fallback/Legacy for compatibility if needed (can be ignored by new renderer)
        longDesc: 'Pipelines e arquiteturas de dados...',
        features: []
    },
    {
        id: 'data-governance',
        title: 'Data Governance & Data Quality',
        subtitle: 'Qualidade & Segurança',
        shortDesc: 'Estruturas de controlo, qualidade e segurança que asseguram confiança total na informação.',
        introduction: [
            'Ter dados não é suficiente: é preciso garantir que são compreendidos, confiáveis, rastreáveis e utilizados de forma consistente em toda a organização.',
            'Sem governança e qualidade, cada área cria as suas próprias métricas, produz números diferentes e interpreta a informação à sua maneira, gerando risco, retrabalho e decisões imprecisas.',
            'A governança e a qualidade de dados resolvem isso, colocando toda a empresa a trabalhar com as mesmas definições, as mesmas regras e a mesma fonte de verdade.'
        ],
        mainFeaturesTitle: 'O que fazemos:',
        mainFeatures: [
            'Criamos normas, políticas, processos e ferramentas que garantem qualidade, coerência, padronização e segurança durante todo o ciclo de vida dos dados desde a sua origem até ao consumo final.'
        ],
        challengesTitle: 'Resolvemos desafios como:',
        challenges: [
            'Falta de definição clara e alinhada de KPIs',
            'Métricas diferentes para a mesma realidade do negócio',
            'Dados contraditórios entre departamentos',
            'Falta de controlo, validação e monitorização da qualidade',
            'Dificuldade em garantir segurança, perfis de acesso e segregação de funções',
            'Ausência de rastreabilidade das transformações de dados',
            'Dados desatualizados, incompletos, duplicados ou inconsistentes'
        ],
        valueTitle: 'Valor para o seu negócio',
        value: [
            'A sua organização passa a operar com uma fonte única de verdade, construída com dados confiáveis, auditáveis e governados.',
            'Isso traduz-se em:'
        ],
        valueList: [
            'Decisões estratégicas mais rápidas e seguras',
            'Redução de riscos financeiros e operacionais',
            'Diminuição de retrabalho e erros',
            'Melhoria da eficiência entre departamentos',
            'Confiança total nos indicadores e relatórios',
            'Preparação para escalabilidade, auditorias e iniciativas avançadas como IA e automação'
        ],
        image: '/img/services/data-governance.png',
        features: []
    },
    {
        id: 'bi',
        title: 'Business Intelligence',
        subtitle: 'Dashboards & Analytics',
        shortDesc: 'Dashboards e análises avançadas que tornam os dados claros, úteis e acionáveis.',
        introduction: [
            'Muitas empresas recolhem dados… mas não conseguem extrair significado.',
            'Relatórios manuais levam horas, dashboards são confusos e a gestão acaba por tomar decisões com base em perceções — não em evidências.',
            'A Ubuntu Analytica transforma dados em clareza.'
        ],
        mainFeaturesTitle: 'O que fazemos:',
        mainFeatures: [
            'Criamos painéis visuais e análises inteligentes que mostram exatamente o que está a acontecer no negócio, porque está a acontecer e o que deve ser feito a seguir.'
        ],
        challengesTitle: 'Resolvemos desafios como:',
        challenges: [
            'Falta de visibilidade operacional e estratégica',
            'Decisões baseadas em suposição',
            'Relatórios manuais, demorados e propensos a erro',
            'KPIs desatualizados ou inconsistentes entre áreas',
            'Dificuldade em identificar riscos, desperdícios e oportunidades',
            'Falta de alinhamento entre indicadores e objetivos do negócio'
        ],
        valueTitle: 'Valor para o seu negócio',
        value: [
            'A empresa passa a operar de forma verdadeiramente data-driven (orientada a dados), com dashboards claros, atualizados e conectados à estratégia.',
            'Isso permite:'
        ],
        valueList: [
            'Decisões mais rápidas e informadas',
            'Monitorização contínua do desempenho',
            'Identificação precoce de riscos e oportunidades',
            'Redução de tempo gasto em relatórios manuais',
            'Alinhamento total entre equipas e objetivos',
            'Visão única e transparente do negócio'
        ],
        image: '/img/services/business-intelligence.png',
        features: []
    },
    {
        id: 'big-data',
        title: 'Big Data',
        subtitle: 'Escala & Performance',
        shortDesc: 'Processamento massivo e em tempo real para empresas que precisam escalar sem limites.',
        introduction: [
            'Quando o volume e a velocidade dos dados aumentam, as ferramentas tradicionais deixam de acompanhar. Consultas ficam lentas, relatórios travam e a operação perde capacidade de resposta.',
            'A solução: escalar a arquitetura e o processamento de dados.'
        ],
        mainFeaturesTitle: 'O que fazemos:',
        mainFeatures: [
            'Implementamos tecnologias modernas capazes de lidar com grandes volumes de dados estruturados e não estruturados, operações em tempo real e consultas complexas sem perda de performance.'
        ],
        challengesTitle: 'Desafios que resolvemos:',
        challenges: [
            'Sistemas sobrecarregados ou lentos',
            'Dificuldade em lidar com grandes volumes de informação',
            'Necessidade de análises imediatas',
            'Limitações técnicas que impedem crescimento',
            'Complexidade crescente dos dados'
        ],
        valueTitle: 'Valor para o negócio',
        value: [
            'A empresa consegue tomar decisões mais rápidas e precisas, identificar oportunidades de receita em tempo real e reduzir custos operacionais, operando com alta eficiência e vantagem competitiva.'
        ],
        image: '/img/services/big-data.png',
        features: []
    },
    {
        id: 'data-science',
        title: 'Data Science & Inteligência Artificial',
        subtitle: 'Previsão & Automação',
        shortDesc: 'Modelos analíticos e IA aplicada que geram previsões, automação e vantagem competitiva.',
        introduction: [
            'Com IA baseada em dados confiáveis e alinhada ao negócio, a empresa consegue transformar informação em inteligência proativa.',
        ],
        mainFeaturesTitle: null, // No specific main features text provided separately
        mainFeatures: [],
        challengesTitle: 'O que alcançamos:',
        challenges: [
            'Antecipar riscos e oportunidades em vendas, operações e clientes',
            'Detectar padrões complexos que passam despercebidos',
            'Automatizar processos manuais, reduzindo custos e aumentando eficiência',
            'Personalizar produtos e serviços para cada cliente',
            'Obter insights estratégicos para decisões mais inteligentes e rápidas'
        ],
        valueTitle: 'Valor para o negócio',
        value: [
            'A organização deixa de reagir apenas ao passado e opera com previsibilidade, agilidade e vantagem competitiva, tomando decisões baseadas em dados e fatos reais.'
        ],
        image: '/img/services/data-science-ai.png',
        features: []
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ServicesPage = () => {
    const { theme } = useTheme();
    const location = useLocation(); // Added hook
    const [selectedIndex, setSelectedIndex] = useState(0);
    const sectionRefs = useRef(services.map(() => React.createRef()));

    // Smooth scroll to section when tab is clicked
    const isManualScroll = useRef(false);

    // Smooth scroll to section when tab is clicked
    const scrollToSection = (index) => {
        setSelectedIndex(index);
        isManualScroll.current = true;

        const section = sectionRefs.current[index].current;
        if (section) {
            // Calculate absolute position with offset for sticky header/tabs
            const yOffset = -250;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });

            // Unlock scroll spy after animation (approx 1s)
            setTimeout(() => {
                isManualScroll.current = false;
            }, 1000);
        }
    };

    // Handle hash scroll on mount
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const index = services.findIndex(s => s.id === id);
            if (index !== -1) {
                // Wait for layout to be ready
                setTimeout(() => {
                    scrollToSection(index);
                }, 500);
            }
        }
    }, [location.hash]);

    // Update active tab on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isManualScroll.current) return;

            const scrollPosition = window.scrollY + 350; // Offset for spy to match visual center

            sectionRefs.current.forEach((ref, index) => {
                if (ref.current && ref.current.offsetTop <= scrollPosition && (ref.current.offsetTop + ref.current.offsetHeight) > scrollPosition) {
                    setSelectedIndex(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-scroll the active tab into view
    useEffect(() => {
        const activeTabEl = document.getElementById(`tab-${selectedIndex}`);
        if (activeTabEl) {
            activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [selectedIndex]);


    // Theme-based colors
    const isLight = theme === 'light';
    const textColor = isLight ? 'text-[#0D1E2C]' : 'text-white';
    const subTextColor = isLight ? 'text-[#0D1E2C]/80' : 'text-white/70';
    const accentColor = 'text-electric-blue'; // Ubuntus electric blue

    // Tab styles
    const tabContainerClass = isLight
        ? 'bg-white/70 border-white/40 shadow-lg'
        : 'bg-[#050505]/60 border-white/10 shadow-glow-soft';

    return (
        <div className={`min-h-screen relative ${isLight ? 'bg-[#F8F9FA]' : 'bg-midnight-black'} transition-colors duration-500`}>

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {!isLight && (
                    <BackgroundEffect
                        orb1Color="bg-neon-purple/20"
                        orb2Color="bg-electric-blue/10"
                        orb1Position="top-[-10%] right-[-10%]"
                        orb2Position="bottom-[-10%] left-[-10%]"
                        className="opacity-50"
                    />
                )}
                {isLight && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-70"></div>
                )}
            </div>

            {/* Header Content */}
            <div className="relative z-10 pt-32 pb-16 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-5xl md:text-7xl font-heading font-extrabold mb-6 ${textColor}`}
                >
                    Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyber-purple">Serviços</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className={`text-lg md:text-xl max-w-2xl mx-auto font-body ${subTextColor}`}
                >
                    Soluções de ponta a ponta para transformar dados em inteligência de negócio.
                </motion.p>
            </div>

            {/* Sticky Floating Tabs */}
            <div className="sticky top-28 md:top-32 z-40 w-full flex justify-center mb-12 md:mb-20 px-2 md:px-4">
                <div className={`
                    backdrop-blur-xl 
                    rounded-2xl md:rounded-full 
                    p-1.5 md:p-2 
                    border 
                    items-center
                    flex
                    active:cursor-grabbing 
                    overflow-x-auto 
                    max-w-full
                    no-scrollbar
                    ${tabContainerClass}
                `}>
                    <TabGroup selectedIndex={selectedIndex} onChange={scrollToSection}>
                        <TabList className="flex items-center space-x-2 md:space-x-4 min-w-max px-2 mx-auto">
                            {services.map((service, index) => (
                                <Tab
                                    key={service.id}
                                    id={`tab-${index}`} // Added ID for scroll targeting
                                    className={({ selected }) =>
                                        classNames(
                                            'relative rounded-full px-4 py-2.5 text-sm md:text-base font-medium transition-all duration-300 focus:outline-none whitespace-nowrap scroll-smooth',
                                            selected
                                                // Active styles handled by motion layoutId below
                                                ? (isLight ? 'text-white' : 'text-white')
                                                : (isLight ? 'text-[#0D1E2C] hover:text-electric-blue' : 'text-white/60 hover:text-white')
                                        )
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="relative z-10">{service.title}</span>
                                            {selected && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-blue to-cyber-purple shadow-lg"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>
                </div>
            </div>

            {/* Services Sections */}
            <div className="container mx-auto px-6 pb-32 relative z-10">
                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    const hasDetailedContent = !!service.introduction;

                    return (
                        <div
                            key={service.id}
                            ref={sectionRefs.current[index]}
                            className="min-h-[80vh] flex items-stretch mb-32 scroll-mt-40"
                        >
                            <div className={`flex flex-col md:flex-row gap-12 w-full ${!isEven ? 'md:flex-row-reverse' : ''}`}>

                                {/* Text Content */}
                                <motion.div
                                    className="flex-1 space-y-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-10%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-cyber-purple/20 border border-electric-blue/30 text-electric-blue font-bold text-xl">
                                                0{index + 1}
                                            </span>
                                            <h3 className="text-electric-blue font-heading tracking-wider uppercase text-sm font-bold">
                                                {service.subtitle}
                                            </h3>
                                        </div>

                                        <h2 className={`text-4xl md:text-5xl font-heading font-bold ${textColor}`}>
                                            {service.title}
                                        </h2>

                                        {/* Content Rendering: Detailed or Simple */}
                                        {hasDetailedContent ? (
                                            <div className="space-y-8">
                                                {/* Introduction Paragraphs */}
                                                <div className={`space-y-4 text-lg font-body leading-relaxed ${subTextColor}`}>
                                                    {service.introduction.map((paragraph, i) => (
                                                        <p key={i}>{paragraph}</p>
                                                    ))}
                                                    {service.mainFeatures && service.mainFeatures.map((mf, i) => (
                                                        <p key={`mf-${i}`} className="font-semibold text-electric-blue">{mf}</p>
                                                    ))}
                                                </div>

                                                {/* Challenges Section */}
                                                {service.challenges && (
                                                    <div className="pt-2">
                                                        <h4 className={`text-xl font-heading font-bold mb-4 ${isLight ? 'text-[#0D1E2C]' : 'text-white'}`}>
                                                            {service.challengesTitle}
                                                        </h4>
                                                        <ul className="grid grid-cols-1 gap-3">
                                                            {service.challenges.map((challenge, i) => (
                                                                <li key={i} className="flex items-start space-x-3">
                                                                    <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-neon-coral"></div>
                                                                    <span className={`${subTextColor}`}>{challenge}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Value Section */}
                                                {service.value && (
                                                    <div className={`p-6 rounded-2xl border ${isLight ? 'bg-blue-50/50 border-blue-100' : 'bg-electric-blue/5 border-electric-blue/20'}`}>
                                                        <h4 className="text-lg font-heading font-bold mb-3 text-electric-blue">
                                                            {service.valueTitle}
                                                        </h4>
                                                        <div className={`space-y-2 ${subTextColor}`}>
                                                            {Array.isArray(service.value) ? service.value.map((v, i) => (
                                                                <p key={i}>{v}</p>
                                                            )) : <p>{service.value}</p>}

                                                            {/* New Value List Support */}
                                                            {service.valueList && (
                                                                <ul className="grid grid-cols-1 gap-2 pt-2">
                                                                    {service.valueList.map((item, i) => (
                                                                        <li key={i} className="flex items-start space-x-2">
                                                                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-electric-blue"></div>
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Fallback for Legacy Data
                                            <>
                                                <p className={`text-xl font-body leading-relaxed ${subTextColor}`}>
                                                    {service.longDesc}
                                                </p>
                                                <div className="grid grid-cols-1 gap-4 pt-4">
                                                    {service.features.map((feature, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 * i, duration: 0.5 }}
                                                            className={`flex items-center space-x-3 p-4 rounded-xl border transition-all hover:translate-x-2 ${isLight
                                                                ? 'bg-white border-[#0D1E2C]/10 shadow-sm'
                                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                                }`}
                                                        >
                                                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-neon-coral shadow-[0_0_10px_rgba(255,95,77,0.5)]"></div>
                                                            <span className={`font-medium ${isLight ? 'text-[#0D1E2C]' : 'text-white'}`}>
                                                                {feature}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Image Visualization - Sticky Side */}
                                <motion.div
                                    className="flex-1 w-full relative"
                                    initial={{ opacity: 0, scale: 0.9, rotate: isEven ? -2 : 2 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: false, margin: "-20%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="sticky top-40 group"> {/* Made Sticky */}
                                        {/* Decorative Elements */}
                                        <div className={`absolute -inset-4 rounded-3xl blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-50 bg-gradient-to-r ${index % 2 === 0 ? 'from-electric-blue to-cyber-purple' : 'from-neon-coral to-electric-blue'
                                            }`}
                                        />

                                        {/* Image Container with Glass/Shape Effect */}
                                        <div className={`relative overflow-hidden rounded-3xl border shadow-2xl ${isLight
                                            ? 'bg-white border-white/50'
                                            : 'bg-[#161b22] border-white/10'
                                            }`}>
                                            {/* Tech Pattern Overlay */}
                                            <div className="absolute inset-0 opacity-10 pointer-events-none z-10"
                                                style={{
                                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(63, 69, 255, 0.5) 1px, transparent 0)',
                                                    backgroundSize: '24px 24px'
                                                }}
                                            />

                                            <div className="aspect-[4/3] w-full relative overflow-hidden">
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                                                />
                                                {/* Liquid Glass Overlay on Image */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                            </div>

                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ServicesPage;
