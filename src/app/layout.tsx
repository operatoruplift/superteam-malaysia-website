import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sun-valley-rouge.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Superteam Malaysia | Solana Builders Community",
    template: "%s | Superteam Malaysia",
  },
  description:
    "Superteam Malaysia is the digital home for Malaysia's best developers, designers, and founders building the future on Solana. Join our community to connect, learn, and earn.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Superteam",
    "Superteam Malaysia",
    "Malaysia",
    "Solana",
    "Web3",
    "Blockchain",
    "Builders",
    "Community",
    "Solana Malaysia",
    "Crypto Malaysia",
    "Hackathon",
    "Bounties",
    "Grants",
    "DeFi",
  ],
  authors: [{ name: "Superteam Malaysia", url: "https://x.com/SuperteamMY" }],
  creator: "Superteam Malaysia",
  publisher: "Superteam Malaysia",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Superteam Malaysia | Solana Builders Community",
    description:
      "Connect, learn, and build with Malaysia's top developers, designers, and founders in the Solana ecosystem.",
    url: siteUrl,
    type: "website",
    locale: "en_MY",
    siteName: "Superteam Malaysia",
    // OG image auto-generated from opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    site: "@SuperteamMY",
    creator: "@SuperteamMY",
    title: "Superteam Malaysia | Solana Builders Community",
    description:
      "Malaysia's home for Solana builders, creators, and founders. Join the movement.",
    // Twitter image auto-generated from twitter-image.tsx
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "theme-color": "#0f0f0f",
    "msapplication-TileColor": "#0f0f0f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Superteam Malaysia",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    description: "Malaysia's home for Solana builders, creators, and founders.",
    sameAs: [
      "https://x.com/SuperteamMY",
      "https://t.me/SuperteamMY",
      "https://discord.gg/superteam",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Superteam",
      url: "https://superteam.fun",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
