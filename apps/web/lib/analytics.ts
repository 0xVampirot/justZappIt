// SPDX-License-Identifier: AGPL-3.0-only
import { useCookieConsent } from "@/components/CookieConsent";

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Type definitions for GA4 events
interface GA4Event {
  name: string;
  parameters: {
    [key: string]: string | number | boolean;
  };
}

interface PageView {
  page_title: string;
  page_location: string;
  page_referrer?: string;
}

// Initialize Google Analytics
export function initializeGA() {
  if (!GA_MEASUREMENT_ID) return;

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    cookie_flags: 'SameSite=Lax;Secure',
    anonymize_ip: true,
    send_page_view: false, // We'll handle page views manually
  });
}

// Track page views
export function trackPageView(pageView: PageView) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: pageView.page_title,
    page_location: pageView.page_location,
    page_referrer: pageView.page_referrer || document.referrer,
  });
}

// Track custom events
export function trackEvent(event: GA4Event) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', event.name, event.parameters);
}

// Specific event trackers for JustZappIt
export const analytics = {
  // Store-related events
  storeView: (storeId: string, storeName: string) => {
    trackEvent({
      name: 'store_view',
      parameters: {
        store_id: storeId,
        store_name: storeName,
        content_type: 'store',
      },
    });
  },

  storeSubmission: (success: boolean) => {
    trackEvent({
      name: 'store_submission',
      parameters: {
        success: success,
        content_type: 'store_submission',
      },
    });
  },

  storeConfirmation: (storeId: string) => {
    trackEvent({
      name: 'store_confirmation',
      parameters: {
        store_id: storeId,
        content_type: 'store_verification',
      },
    });
  },

  storeFlag: (storeId: string, reason: string) => {
    trackEvent({
      name: 'store_flag',
      parameters: {
        store_id: storeId,
        flag_reason: reason,
        content_type: 'store_moderation',
      },
    });
  },

  // User interaction events
  mapInteraction: (action: string, zoomLevel?: number) => {
    trackEvent({
      name: 'map_interaction',
      parameters: {
        action: action, // 'zoom', 'pan', 'click'
        zoom_level: zoomLevel || 0,
        content_type: 'map',
      },
    });
  },

  searchQuery: (query: string, resultCount: number) => {
    trackEvent({
      name: 'search',
      parameters: {
        search_term: query,
        result_count: resultCount,
        content_type: 'search',
      },
    });
  },

  // Content engagement events
  articleView: (articleSlug: string, category: string) => {
    trackEvent({
      name: 'article_view',
      parameters: {
        article_slug: articleSlug,
        article_category: category,
        content_type: 'article',
      },
    });
  },

  newsletterSignup: (frequency: string) => {
    trackEvent({
      name: 'newsletter_signup',
      parameters: {
        frequency: frequency,
        content_type: 'newsletter',
      },
    });
  },

  // Conversion events
  adClick: (adUnit: string, adFormat: string) => {
    trackEvent({
      name: 'ad_click',
      parameters: {
        ad_unit: adUnit,
        ad_format: adFormat,
        content_type: 'advertisement',
      },
    });
  },

  adImpression: (adUnit: string, adFormat: string) => {
    trackEvent({
      name: 'ad_impression',
      parameters: {
        ad_unit: adUnit,
        ad_format: adFormat,
        content_type: 'advertisement',
      },
    });
  },

  // Error tracking
  error: (errorType: string, errorMessage: string) => {
    trackEvent({
      name: 'error',
      parameters: {
        error_type: errorType,
        error_message: errorMessage,
        content_type: 'error',
      },
    });
  },

  // Performance metrics
  pageLoadTime: (loadTime: number) => {
    trackEvent({
      name: 'page_load_time',
      parameters: {
        load_time_ms: loadTime,
        content_type: 'performance',
      },
    });
  },

  // User engagement
  sessionDuration: (duration: number) => {
    trackEvent({
      name: 'session_duration',
      parameters: {
        duration_seconds: duration,
        content_type: 'engagement',
      },
    });
  },
};

// React hook for analytics
export function useAnalytics() {
  const { consent, preferences } = useCookieConsent();

  const initialize = () => {
    if (consent && preferences?.analytics) {
      initializeGA();
    }
  };

  const canTrack = () => {
    return consent === true && preferences?.analytics === true;
  };

  return {
    initialize,
    canTrack,
    trackPageView: canTrack() ? trackPageView : () => {},
    trackEvent: canTrack() ? trackEvent : () => {},
    analytics: canTrack() ? analytics : {
      storeView: () => {},
      storeSubmission: () => {},
      storeConfirmation: () => {},
      storeFlag: () => {},
      mapInteraction: () => {},
      searchQuery: () => {},
      articleView: () => {},
      newsletterSignup: () => {},
      adClick: () => {},
      adImpression: () => {},
      error: () => {},
      pageLoadTime: () => {},
      sessionDuration: () => {},
    },
  };
}

// Performance monitoring
export function trackPerformance() {
  if (typeof window === 'undefined') return;

  // Track page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    analytics.pageLoadTime(Math.round(loadTime));
  });

  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackEvent({
        name: 'lcp',
        parameters: {
          value: Math.round(lastEntry.startTime),
          content_type: 'performance',
        },
      });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const inputEntry = entry as any;
        trackEvent({
          name: 'fid',
          parameters: {
            value: Math.round(inputEntry.processingStart - entry.startTime),
            content_type: 'performance',
          },
        });
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const layoutEntry = entry as any;
        if (!layoutEntry.hadRecentInput) {
          clsScore += layoutEntry.value;
        }
      });
      trackEvent({
        name: 'cls',
        parameters: {
          value: Math.round(clsScore * 1000) / 1000,
          content_type: 'performance',
        },
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

// Session tracking
export function trackSession() {
  let sessionStart = Date.now();

  // Track session duration on page unload
  const handlePageUnload = () => {
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    analytics.sessionDuration(duration);
  };

  window.addEventListener('beforeunload', handlePageUnload);
  window.addEventListener('pagehide', handlePageUnload);
}

// Error tracking
export function trackErrors() {
  // Track JavaScript errors
  window.addEventListener('error', (event) => {
    analytics.error('javascript_error', event.message);
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    analytics.error('unhandled_promise_rejection', event.reason);
  });
}

// Initialize all tracking
export function initializeTracking() {
  const { canTrack } = useAnalytics();
  
  if (canTrack()) {
    trackPerformance();
    trackSession();
    trackErrors();
  }
}

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
