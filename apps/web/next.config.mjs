import { config } from "dotenv";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "../../.env.local") });

/** @type {import('next').NextConfig} */

// AdSense domains — included in CSP so ads work when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set
const adsenseScriptSrc =
  "https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://tpc.googlesyndication.com";
const adsenseImgSrc =
  "https://pagead2.googlesyndication.com https://www.google.com https://www.googletagmanager.com";
const adsenseFrameSrc =
  "https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com";
const adsenseConnectSrc =
  "https://pagead2.googlesyndication.com https://adservice.google.com";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://hcaptcha.com https://*.hcaptcha.com ${adsenseScriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://unpkg.com",
      `img-src 'self' data: blob: https://*.tile.openstreetmap.org https://staticmap.openstreetmap.de https://*.hcaptcha.com ${adsenseImgSrc}`,
      "font-src 'self' https://fonts.gstatic.com",
      `connect-src 'self' https://*.supabase.co https://hcaptcha.com https://*.hcaptcha.com https://nominatim.openstreetmap.org ${adsenseConnectSrc}`,
      `frame-src https://hcaptcha.com https://*.hcaptcha.com ${adsenseFrameSrc}`,
      "object-src 'none'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staticmap.openstreetmap.de",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
