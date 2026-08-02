import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import LenisSetup from "@/components/lenisWrapper";
import { EMAIL, GITHUB, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import "./globals.css";
import { useState } from "react";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tvorba webových stránek | Alex Liška - Pardubice a okolí",
    template: "%s | Alex Liška",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "tvorba webových stránek",
    "webový vývojář Pardubice",
    "freelance developer",
    "webové aplikace na míru",
    "landing page",
    "firemní web",
    "Next.js",
    "React",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "/",
    siteName: SITE_NAME,
    title: "Tvorba webových stránek | Alex Liška - Pardubice a okolí",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tvorba webových stránek | Alex Liška",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#alex`,
      name: SITE_NAME,
      url: SITE_URL,
      email: EMAIL,
      jobTitle: "Freelance webový vývojář",
      sameAs: [GITHUB],
      alumniOf: "Technická univerzita v Liberci",
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "GSAP"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#sluzby`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: EMAIL,
      provider: { "@id": `${SITE_URL}/#alex` },
      areaServed: { "@type": "Place", name: "Pardubice a okolí, Česká republika" },
      priceRange: "10000-45000 CZK",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [activeLink, setActiveLink] = useState<string | null>(null);
  return (
    <html
      lang="cs"
      className={`${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <LenisSetup>
          <Header setActiveLink={setActiveLink} />
          {children}
          {activeLink !== '/portfolio' && (
            <div className="fixed bottom-10 w-full flex justify-center">
              <span className='text-white font-jet mix-blend-difference'>↓ scroluj ↓</span>
            </div>
          )}
        </LenisSetup>
      </body>
    </html>
  );
}
