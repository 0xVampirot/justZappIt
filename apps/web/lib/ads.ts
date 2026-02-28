// SPDX-License-Identifier: AGPL-3.0-only
import { useCookieConsent } from "@/components/CookieConsent";

// AdSense configuration
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// Ad unit configurations
export interface AdUnit {
  id: string;
  slot: string;
  format: 'auto' | 'rectangle' | 'skyscraper' | 'banner';
  size?: [number, number][];
  responsive: boolean;
  category: string;
  maxAdsPerPage: number;
}

// Predefined ad units for JustZappIt
export const adUnits: Record<string, AdUnit> = {
  // Homepage ads
  'home-header': {
    id: 'home-header',
    slot: '1234567890', // Replace with actual AdSense slot ID
    format: 'banner',
    size: [[728, 90], [970, 90]],
    responsive: true,
    category: 'general',
    maxAdsPerPage: 1,
  },
  'home-sidebar': {
    id: 'home-sidebar',
    slot: '1234567891', // Replace with actual AdSense slot ID
    format: 'skyscraper',
    size: [[160, 600], [300, 600]],
    responsive: true,
    category: 'general',
    maxAdsPerPage: 1,
  },
  'home-content': {
    id: 'home-content',
    slot: '1234567892', // Replace with actual AdSense slot ID
    format: 'rectangle',
    size: [[300, 250], [336, 280]],
    responsive: true,
    category: 'general',
    maxAdsPerPage: 2,
  },

  // Blog ads
  'blog-header': {
    id: 'blog-header',
    slot: '1234567893', // Replace with actual AdSense slot ID
    format: 'banner',
    size: [[728, 90], [970, 90]],
    responsive: true,
    category: 'education',
    maxAdsPerPage: 1,
  },
  'blog-in-content': {
    id: 'blog-in-content',
    slot: '1234567894', // Replace with actual AdSense slot ID
    format: 'rectangle',
    size: [[300, 250], [336, 280]],
    responsive: true,
    category: 'education',
    maxAdsPerPage: 3,
  },
  'blog-sidebar': {
    id: 'blog-sidebar',
    slot: '1234567895', // Replace with actual AdSense slot ID
    format: 'skyscraper',
    size: [[160, 600], [300, 600]],
    responsive: true,
    category: 'education',
    maxAdsPerPage: 1,
  },

  // Store page ads
  'store-sidebar': {
    id: 'store-sidebar',
    slot: '1234567896', // Replace with actual AdSense slot ID
    format: 'rectangle',
    size: [[300, 250], [336, 280]],
    responsive: true,
    category: 'local',
    maxAdsPerPage: 1,
  },
  'store-footer': {
    id: 'store-footer',
    slot: '1234567897', // Replace with actual AdSense slot ID
    format: 'banner',
    size: [[728, 90], [970, 90]],
    responsive: true,
    category: 'local',
    maxAdsPerPage: 1,
  },

  // Footer ad (sitewide)
  'footer': {
    id: 'footer',
    slot: '1234567898', // Replace with actual AdSense slot ID
    format: 'banner',
    size: [[728, 90], [970, 90]],
    responsive: true,
    category: 'general',
    maxAdsPerPage: 1,
  },
};

// Ad placement strategy
export interface AdPlacement {
  page: string;
  units: string[];
  maxTotalAds: number;
  insertionPoints?: {
    afterParagraph?: number[];
    beforeElement?: string[];
    afterElement?: string[];
  };
}

// Ad placement configurations by page type
export const adPlacements: Record<string, AdPlacement> = {
  homepage: {
    page: 'homepage',
    units: ['home-header', 'home-sidebar', 'home-content', 'footer'],
    maxTotalAds: 3,
    insertionPoints: {
      afterElement: ['#map-container'],
    },
  },
  blog: {
    page: 'blog',
    units: ['blog-header', 'blog-in-content', 'blog-sidebar', 'footer'],
    maxTotalAds: 4,
    insertionPoints: {
      afterParagraph: [2, 5, 8], // Insert ads after paragraphs 2, 5, and 8
    },
  },
  'blog-article': {
    page: 'blog-article',
    units: ['blog-header', 'blog-in-content', 'blog-sidebar', 'footer'],
    maxTotalAds: 4,
    insertionPoints: {
      afterParagraph: [3, 7, 12], // Insert ads after paragraphs 3, 7, and 12
    },
  },
  store: {
    page: 'store',
    units: ['store-sidebar', 'store-footer', 'footer'],
    maxTotalAds: 2,
    insertionPoints: {
      beforeElement: ['#store-details'],
    },
  },
  guides: {
    page: 'guides',
    units: ['blog-header', 'blog-in-content', 'footer'],
    maxTotalAds: 3,
    insertionPoints: {
      afterParagraph: [4, 9],
    },
  },
  default: {
    page: 'default',
    units: ['footer'],
    maxTotalAds: 1,
  },
};

// Ad density compliance (max 3 ads per page per AdSense policy)
export const AD_DENSITY_LIMIT = 3;

// Ad blocking detection
export function detectAdBlocker(): Promise<boolean> {
  return new Promise((resolve) => {
    // Create a bait element that ad blockers typically block
    const bait = document.createElement('div');
    bait.setAttribute('class', 'adsbox');
    bait.setAttribute('style', 'height: 1px; width: 1px; position: absolute; top: -1px; left: -1px;');
    document.body.appendChild(bait);

    setTimeout(() => {
      const isBlocked = bait.offsetHeight === 0;
      document.body.removeChild(bait);
      resolve(isBlocked);
    }, 100);
  });
}

// AdSense compliance utilities
export const adCompliance = {
  // Check if ad placement complies with density limits
  checkDensity: (currentAds: number): boolean => {
    return currentAds < AD_DENSITY_LIMIT;
  },

  // Check if content length supports ads (minimum 300 characters)
  checkContentLength: (content: string): boolean => {
    return content.length >= 300;
  },

  // Check if page category allows ads
  checkCategoryAllowed: (category: string): boolean => {
    const disallowedCategories = ['adult', 'gambling', 'illegal', 'hate'];
    return !disallowedCategories.includes(category.toLowerCase());
  },

  // Validate ad placement
  validatePlacement: (placement: AdPlacement, pageContent?: string): boolean => {
    // Check total ad count
    if (placement.units.length > placement.maxTotalAds) {
      return false;
    }

    // Check content length if provided
    if (pageContent && !adCompliance.checkContentLength(pageContent)) {
      return false;
    }

    return true;
  },
};

// React hook for ad management
export function useAds() {
  const { consent, preferences } = useCookieConsent();

  const canShowAds = () => {
    return (
      ADSENSE_CLIENT_ID &&
      consent === true &&
      preferences?.marketing === true
    );
  };

  const getAdUnit = (unitId: string): AdUnit | null => {
    return adUnits[unitId] || null;
  };

  const getPlacement = (pageType: string): AdPlacement => {
    return adPlacements[pageType] || adPlacements.default;
  };

  const shouldShowAd = (unitId: string, currentAds: number = 0): boolean => {
    if (!canShowAds()) return false;

    const unit = getAdUnit(unitId);
    if (!unit) return false;

    return adCompliance.checkDensity(currentAds);
  };

  return {
    canShowAds,
    getAdUnit,
    getPlacement,
    shouldShowAd,
    detectAdBlocker,
    adCompliance,
  };
}

// Ad rendering utilities
export const adRenderer = {
  // Generate AdSense ad element
  generateAdElement: (unit: AdUnit): HTMLDivElement => {
    const adElement = document.createElement('div');
    adElement.setAttribute('id', `ad-${unit.id}`);
    adElement.setAttribute('class', 'adsense-ad');
    adElement.setAttribute('data-ad-client', ADSENSE_CLIENT_ID || '');
    adElement.setAttribute('data-ad-slot', unit.slot);
    adElement.setAttribute('data-ad-format', unit.format);
    adElement.setAttribute('data-full-width-responsive', unit.responsive ? 'true' : 'false');

    if (unit.size) {
      adElement.setAttribute('style', `width: ${unit.size[0][0]}px; height: ${unit.size[0][1]}px;`);
    }

    return adElement;
  },

  // Push ad to AdSense
  pushAd: (unit: AdUnit) => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  },

  // Insert ad into content
  insertIntoContent: (
    content: string,
    unit: AdUnit,
    insertionPoints: { afterParagraph?: number[] }
  ): string => {
    const paragraphs = content.split('\n\n');
    
    if (insertionPoints.afterParagraph) {
      insertionPoints.afterParagraph.forEach((paragraphIndex, index) => {
        if (paragraphIndex < paragraphs.length) {
          const adElement = adRenderer.generateAdElement(unit);
          paragraphs.splice(paragraphIndex + index + 1, 0, adElement.outerHTML);
        }
      });
    }

    return paragraphs.join('\n\n');
  },

  // Create responsive ad container
  createResponsiveContainer: (unit: AdUnit): HTMLDivElement => {
    const container = document.createElement('div');
    container.setAttribute('class', 'ad-container');
    container.setAttribute('style', `
      text-align: center;
      margin: 20px 0;
      clear: both;
    `);

    const adElement = adRenderer.generateAdElement(unit);
    container.appendChild(adElement);

    return container;
  },
};

// Ad performance monitoring
export const adPerformance = {
  // Track ad impressions
  trackImpression: (unitId: string, placement: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_unit: unitId,
        placement: placement,
        content_type: 'advertisement',
      });
    }
  },

  // Track ad clicks
  trackClick: (unitId: string, placement: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        ad_unit: unitId,
        placement: placement,
        content_type: 'advertisement',
      });
    }
  },

  // Track ad blocking
  trackAdBlock: (isBlocked: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_block', {
        is_blocked: isBlocked,
        content_type: 'advertisement',
      });
    }
  },
};

// Initialize ad blocking detection and performance tracking
export function initializeAdTracking() {
  // Detect ad blockers
  detectAdBlocker().then((isBlocked) => {
    adPerformance.trackAdBlock(isBlocked);
    
    if (isBlocked) {
      console.log('Ad blocker detected');
      // Could show a message or alternative content
    }
  });
}

// Type declarations for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
    gtag: (...args: any[]) => void;
  }
}
