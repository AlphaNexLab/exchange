import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Ergo Frontier — The Edge of Decentralized Exchange",
  description: "Trade ERG peer-to-peer with trustless smart contract escrow and Verification Network. No exchange. No middleman. Just the frontier.",
  keywords: "Ergo, ERG, cryptocurrency, P2P exchange, DeFi, decentralized verification, trustless, frontier, decentralized trading",
  authors: [{ name: "Ergo Frontier Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0d0a07",
  openGraph: {
    title: "Ergo Frontier — The Edge of Decentralized Exchange",
    description: "Trade ERG peer-to-peer with trustless smart contract escrow and Verification Network.",
    type: "website",
    url: "https://exchange.ergofrontier.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ergo Frontier — The Edge of Decentralized Exchange",
    description: "Trade ERG peer-to-peer with trustless smart contract escrow and Verification Network."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen bg-space-900 text-slate-50 antialiased overflow-x-hidden`}>
        <div className="legendary-bg min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}