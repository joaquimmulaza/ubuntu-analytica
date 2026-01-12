/**
 * Google Analytics Utility
 * 
 * Utilitário para rastreamento de eventos e métricas no Google Analytics 4
 * Seguindo melhores práticas de privacidade e performance
 */

// Declaração de tipos para o gtag global
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'set' | 'js',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

// ID do Google Analytics (GA4)
const GA_MEASUREMENT_ID = 'G-MYF65LHQ52';

/**
 * Verifica se o Google Analytics está disponível
 */
export const isAnalyticsAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Rastreia uma visualização de página (page view)
 * Útil para SPAs com React Router
 * 
 * @param url - URL da página (opcional, usa window.location.pathname por padrão)
 * @param title - Título da página (opcional)
 */
export const trackPageView = (url?: string, title?: string): void => {
    if (!isAnalyticsAvailable()) {
        console.warn('Google Analytics não está disponível');
        return;
    }

    const pageUrl = url || window.location.pathname + window.location.search;
    const pageTitle = title || document.title;

    window.gtag!('event', 'page_view', {
        page_path: pageUrl,
        page_title: pageTitle,
        page_location: window.location.href,
    });

    console.log('📊 Page view tracked:', pageUrl);
};

/**
 * Interface para eventos personalizados
 */
interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
    [key: string]: any;
}

/**
 * Rastreia um evento personalizado
 * 
 * @param event - Objeto com dados do evento
 * 
 * @example
 * trackEvent({
 *   action: 'click',
 *   category: 'button',
 *   label: 'contact_form_submit',
 *   value: 1
 * });
 */
export const trackEvent = (event: AnalyticsEvent): void => {
    if (!isAnalyticsAvailable()) {
        console.warn('Google Analytics não está disponível');
        return;
    }

    const { action, category, label, value, ...customParams } = event;

    window.gtag!('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customParams,
    });

    console.log('📊 Event tracked:', event);
};

/**
 * Eventos pré-definidos para facilitar o uso
 */
export const AnalyticsEvents = {
    // Navegação
    navigation: (destination: string) =>
        trackEvent({
            action: 'navigation',
            category: 'engagement',
            label: destination,
        }),

    // Cliques em botões
    buttonClick: (buttonName: string, location?: string) =>
        trackEvent({
            action: 'click',
            category: 'button',
            label: buttonName,
            location: location,
        }),

    // Envio de formulários
    formSubmit: (formName: string, success: boolean = true) =>
        trackEvent({
            action: 'form_submit',
            category: 'form',
            label: formName,
            success: success,
        }),

    // Conversões
    conversion: (type: string, value?: number) =>
        trackEvent({
            action: 'conversion',
            category: 'conversion',
            label: type,
            value: value,
        }),

    // Downloads
    download: (fileName: string, fileType?: string) =>
        trackEvent({
            action: 'download',
            category: 'engagement',
            label: fileName,
            file_type: fileType,
        }),

    // Links externos
    externalLink: (url: string, linkText?: string) =>
        trackEvent({
            action: 'click',
            category: 'external_link',
            label: linkText || url,
            destination: url,
        }),

    // Scroll depth
    scrollDepth: (percentage: number) =>
        trackEvent({
            action: 'scroll',
            category: 'engagement',
            label: `${percentage}%`,
            value: percentage,
        }),

    // Tempo na página
    timeOnPage: (seconds: number, pageName?: string) =>
        trackEvent({
            action: 'time_on_page',
            category: 'engagement',
            label: pageName || window.location.pathname,
            value: seconds,
        }),

    // Interações com vídeo
    videoPlay: (videoTitle: string) =>
        trackEvent({
            action: 'video_play',
            category: 'video',
            label: videoTitle,
        }),

    videoComplete: (videoTitle: string) =>
        trackEvent({
            action: 'video_complete',
            category: 'video',
            label: videoTitle,
        }),

    // Erros
    error: (errorMessage: string, errorLocation?: string) =>
        trackEvent({
            action: 'error',
            category: 'error',
            label: errorMessage,
            location: errorLocation,
        }),
};

/**
 * Define propriedades do usuário
 * 
 * @param properties - Objeto com propriedades do usuário
 */
export const setUserProperties = (properties: Record<string, any>): void => {
    if (!isAnalyticsAvailable()) {
        console.warn('Google Analytics não está disponível');
        return;
    }

    window.gtag!('set', 'user_properties', properties);
    console.log('📊 User properties set:', properties);
};

/**
 * Hook para rastrear scroll depth automaticamente
 * Chame esta função uma vez quando o componente montar
 */
export const initScrollTracking = (): (() => void) => {
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
        const scrollPercentage = Math.round(
            ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );

        thresholds.forEach((threshold) => {
            if (scrollPercentage >= threshold && !tracked.has(threshold)) {
                tracked.add(threshold);
                AnalyticsEvents.scrollDepth(threshold);
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Retorna função de cleanup
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
};

/**
 * Hook para rastrear tempo na página
 * Chame esta função quando o componente montar
 * 
 * @param pageName - Nome da página (opcional)
 */
export const initTimeTracking = (pageName?: string): (() => void) => {
    const startTime = Date.now();

    const cleanup = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 5) {
            // Só rastreia se passou mais de 5 segundos
            AnalyticsEvents.timeOnPage(timeSpent, pageName);
        }
    };

    // Rastreia quando o usuário sai da página
    window.addEventListener('beforeunload', cleanup);

    // Retorna função de cleanup
    return () => {
        cleanup();
        window.removeEventListener('beforeunload', cleanup);
    };
};

export default {
    trackPageView,
    trackEvent,
    setUserProperties,
    isAnalyticsAvailable,
    AnalyticsEvents,
    initScrollTracking,
    initTimeTracking,
};
