// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";
const CONSENT_PREFERENCES_KEY = "cookie_preferences";

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    const storedPrefs = localStorage.getItem(CONSENT_PREFERENCES_KEY);
    
    if (stored === "accepted") {
      setConsent(true);
      if (storedPrefs) {
        setPreferences(JSON.parse(storedPrefs));
      }
    } else if (stored === "declined") {
      setConsent(false);
    }
  }, []);

  return { consent, preferences };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const updatedPrefs = { ...preferences, analytics: true, marketing: true, functional: true };
    localStorage.setItem(CONSENT_KEY, "accepted");
    localStorage.setItem(CONSENT_PREFERENCES_KEY, JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setVisible(false);
    // Reload to enable scripts
    window.location.reload();
  };

  const handleAcceptSelected = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    localStorage.setItem(CONSENT_PREFERENCES_KEY, JSON.stringify(preferences));
    setVisible(false);
    // Reload to enable selected scripts
    window.location.reload();
  };

  const handleDecline = () => {
    const minimalPrefs = { essential: true, analytics: false, marketing: false, functional: false };
    localStorage.setItem(CONSENT_KEY, "declined");
    localStorage.setItem(CONSENT_PREFERENCES_KEY, JSON.stringify(minimalPrefs));
    setPreferences(minimalPrefs);
    setVisible(false);
  };

  const handlePreferenceChange = (category: keyof ConsentPreferences, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  if (!visible) return null;

  if (showPreferences) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[var(--color-text-primary)] font-semibold">Cookie Preferences</h3>
            <button
              onClick={() => setShowPreferences(false)}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">Essential Cookies</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Required for the site to function</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.essential}
                disabled
                className="w-4 h-4 text-primary rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">Analytics Cookies</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Help us improve our website</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                className="w-4 h-4 text-primary rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">Marketing Cookies</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Used for advertising and personalization</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                className="w-4 h-4 text-primary rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">Functional Cookies</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Enable enhanced features</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                className="w-4 h-4 text-primary rounded"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAcceptSelected}
              className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-border)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            This site uses cookies to enhance your experience and analyze traffic. By continuing to use our site, you agree to our use of cookies.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
            <Link href="/legal/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <button
              onClick={() => setShowPreferences(true)}
              className="hover:text-primary transition-colors"
            >
              Manage Preferences
            </button>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-md bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
