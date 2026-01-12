/**
 * Hook personalizado para Google Analytics
 * 
 * Facilita o uso do Google Analytics em componentes React
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    trackPageView,
    initScrollTracking,
    initTimeTracking,
    AnalyticsEvents,
} from '../utils/analytics';

/**
 * Hook para rastrear page views automaticamente
 * Use no componente principal da aplicação (App.tsx)
 * 
 * @example
 * function App() {
 *   usePageTracking();
 *   return <div>...</div>;
 * }
 */
export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Rastreia a visualização da página sempre que a rota mudar
        trackPageView(location.pathname + location.search);
    }, [location]);
};

/**
 * Hook para rastrear scroll depth
 * Use em páginas longas onde você quer saber até onde o usuário rolou
 * 
 * @example
 * function LandingPage() {
 *   useScrollTracking();
 *   return <div>...</div>;
 * }
 */
export const useScrollTracking = () => {
    useEffect(() => {
        const cleanup = initScrollTracking();
        return cleanup;
    }, []);
};

/**
 * Hook para rastrear tempo na página
 * 
 * @param pageName - Nome da página (opcional)
 * 
 * @example
 * function AboutPage() {
 *   useTimeTracking('About Page');
 *   return <div>...</div>;
 * }
 */
export const useTimeTracking = (pageName?: string) => {
    useEffect(() => {
        const cleanup = initTimeTracking(pageName);
        return cleanup;
    }, [pageName]);
};

/**
 * Hook combinado para rastreamento completo
 * Inclui scroll depth e tempo na página
 * 
 * @param pageName - Nome da página (opcional)
 * 
 * @example
 * function ProductPage() {
 *   useAnalytics('Product Page');
 *   return <div>...</div>;
 * }
 */
export const useAnalytics = (pageName?: string) => {
    useScrollTracking();
    useTimeTracking(pageName);
};

/**
 * Hook para rastrear cliques em elementos
 * 
 * @param elementName - Nome do elemento
 * @param category - Categoria do evento (padrão: 'button')
 * 
 * @example
 * function ContactButton() {
 *   const trackClick = useClickTracking('Contact Button');
 *   return <button onClick={trackClick}>Contact Us</button>;
 * }
 */
export const useClickTracking = (elementName: string, category: string = 'button') => {
    return () => {
        AnalyticsEvents.buttonClick(elementName, window.location.pathname);
    };
};

export default {
    usePageTracking,
    useScrollTracking,
    useTimeTracking,
    useAnalytics,
    useClickTracking,
};
