// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useEffect } from "react";
import { useCookieConsent } from "./CookieConsent";

/**
 * Loads the Google AdSense script only when:
 *  1. NEXT_PUBLIC_ADSENSE_CLIENT_ID is configured
 *  2. User has accepted cookie consent
 */
export default function AdSenseScript() {
  const consent = useCookieConsent();
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || consent !== true) return;
    if (document.querySelector(`script[src*="adsbygoogle"]`)) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = "anonymous";
    script.async = true;
    document.head.appendChild(script);
  }, [clientId, consent]);

  return null;
}
