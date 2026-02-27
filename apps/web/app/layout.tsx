import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  // verification: { google: "REAL_CODE_HERE" }, // Uncomment when Google Search Console is configured
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}
