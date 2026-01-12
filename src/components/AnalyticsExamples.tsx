/**
 * Exemplo de Componente com Google Analytics
 * 
 * Este arquivo demonstra como integrar o Google Analytics em componentes React
 */

import React from 'react';
import { AnalyticsEvents } from '../utils/analytics';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Exemplo 1: Botão com rastreamento de clique
 */
export function TrackedButton() {
    const handleClick = () => {
        // Rastreia o clique antes de executar a ação
        AnalyticsEvents.buttonClick('CTA Button', 'Example Page');

        // Sua lógica aqui
        console.log('Button clicked!');
    };

    return (
        <button onClick={handleClick} className="btn-primary">
            Clique Aqui
        </button>
    );
}

/**
 * Exemplo 2: Formulário com rastreamento de submissão
 */
export function TrackedForm() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Simula envio do formulário
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Rastreia sucesso
            AnalyticsEvents.formSubmit('Contact Form', true);
            AnalyticsEvents.conversion('contact_form_submission');

            alert('Formulário enviado com sucesso!');
        } catch (error) {
            // Rastreia erro
            AnalyticsEvents.formSubmit('Contact Form', false);
            AnalyticsEvents.error('Form submission failed', 'Contact Form');

            alert('Erro ao enviar formulário');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" required />
            <input type="email" placeholder="Email" required />
            <button type="submit">Enviar</button>
        </form>
    );
}

/**
 * Exemplo 3: Link externo com rastreamento
 */
export function TrackedExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    const handleClick = () => {
        AnalyticsEvents.externalLink(href, typeof children === 'string' ? children : href);
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
}

/**
 * Exemplo 4: Página com rastreamento completo
 * Rastreia scroll depth e tempo na página automaticamente
 */
export function TrackedPage() {
    // Este hook rastreia automaticamente:
    // - Scroll depth (25%, 50%, 75%, 90%, 100%)
    // - Tempo na página
    useAnalytics('Example Page');

    return (
        <div className="page-container">
            <h1>Página com Rastreamento Completo</h1>
            <p>Esta página rastreia scroll e tempo automaticamente</p>

            {/* Conteúdo longo para demonstrar scroll tracking */}
            <div style={{ height: '200vh' }}>
                <p>Role para baixo para ver o rastreamento de scroll em ação</p>
            </div>
        </div>
    );
}

/**
 * Exemplo 5: Download com rastreamento
 */
export function TrackedDownload() {
    const handleDownload = () => {
        const fileName = 'relatorio-2026.pdf';
        const fileUrl = '/downloads/relatorio-2026.pdf';

        // Rastreia o download
        AnalyticsEvents.download(fileName, 'pdf');

        // Inicia o download
        window.open(fileUrl, '_blank');
    };

    return (
        <button onClick={handleDownload} className="btn-download">
            📥 Download Relatório
        </button>
    );
}

/**
 * Exemplo 6: Navegação com rastreamento
 */
export function TrackedNavigation() {
    const handleNavigate = (destination: string) => {
        // Rastreia a navegação
        AnalyticsEvents.navigation(destination);

        // Navega (exemplo com window.location, mas você pode usar react-router)
        window.location.href = destination;
    };

    return (
        <nav>
            <button onClick={() => handleNavigate('/servicos')}>Serviços</button>
            <button onClick={() => handleNavigate('/candidaturas')}>Candidaturas</button>
            <button onClick={() => handleNavigate('/demos')}>Demos</button>
        </nav>
    );
}

/**
 * Exemplo 7: Vídeo com rastreamento
 */
export function TrackedVideo() {
    const videoTitle = 'Apresentação Ubuntu Analytica';

    const handlePlay = () => {
        AnalyticsEvents.videoPlay(videoTitle);
    };

    const handleEnded = () => {
        AnalyticsEvents.videoComplete(videoTitle);
    };

    return (
        <video
            controls
            onPlay={handlePlay}
            onEnded={handleEnded}
        >
            <source src="/videos/apresentacao.mp4" type="video/mp4" />
        </video>
    );
}

/**
 * Exemplo 8: Conversão com valor
 */
export function TrackedPurchase() {
    const handlePurchase = (amount: number) => {
        // Rastreia a conversão com valor monetário
        AnalyticsEvents.conversion('purchase', amount);

        // Sua lógica de compra aqui
        console.log(`Compra de R$ ${amount} realizada`);
    };

    return (
        <button onClick={() => handlePurchase(299.90)} className="btn-buy">
            Comprar por R$ 299,90
        </button>
    );
}

/**
 * Exemplo 9: Evento personalizado
 */
export function CustomEventExample() {
    const handleCustomAction = () => {
        // Para eventos que não se encaixam nos pré-definidos
        import('../utils/analytics').then(({ trackEvent }) => {
            trackEvent({
                action: 'custom_interaction',
                category: 'engagement',
                label: 'Special Feature Used',
                value: 1,
                // Parâmetros personalizados
                feature_name: 'advanced_filter',
                user_tier: 'premium',
            });
        });
    };

    return (
        <button onClick={handleCustomAction}>
            Usar Recurso Especial
        </button>
    );
}

// Exporta todos os exemplos
export default {
    TrackedButton,
    TrackedForm,
    TrackedExternalLink,
    TrackedPage,
    TrackedDownload,
    TrackedNavigation,
    TrackedVideo,
    TrackedPurchase,
    CustomEventExample,
};
