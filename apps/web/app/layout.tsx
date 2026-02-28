// SPDX-License-Identifier: AGPL-3.0-only
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AdSenseScript from "@/components/AdSenseScript";
import CookieConsent from "@/components/CookieConsent";
import EnhancedHeader from "@/components/navigation/EnhancedHeader";
import EnhancedFooter from "@/components/navigation/EnhancedFooter";
import "@/styles/index.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "JustZappIt | Find Physical Crypto Exchanges Near You",
    template: "%s | JustZappIt",
  },
  description:
    "Discover the most comprehensive global directory of physical crypto exchange shops. Safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you. Community-verified stores.",
  keywords: [
    "crypto exchange near me",
    "buy bitcoin with cash",
    "sell crypto for cash",
    "physical crypto store",
    "crypto ATM alternative",
    "OTC crypto desk",
    "USDT to fiat",
    "bitcoin exchange shop",
  ],
  authors: [{ name: "JustZappIt" }],
  creator: "JustZappIt",
  publisher: "JustZappIt",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://justzappit.xyz"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JustZappIt | Find Physical Crypto Exchanges Near You",
    description:
      "Discover the most comprehensive global directory of physical crypto exchange shops. Safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you.",
    url: "https://justzappit.xyz",
    siteName: "JustZappIt",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JustZappIt - Find Crypto Exchanges Near You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JustZappIt | Find Physical Crypto Exchanges Near You",
    description:
      "Discover the most comprehensive global directory of physical crypto exchange shops. Safely trade BTC, ETH, USDT, and other cryptocurrencies for cash near you.",
    images: ["/og-image.jpg"],
    creator: "@justzappit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <EnhancedHeader />
        <main className="flex-1">{children}</main>
        <EnhancedFooter />
        <AdSenseScript />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && <CookieConsent />}
        <Analytics />
      </body>
    </html>
  );
}
