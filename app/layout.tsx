import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import LenisSetup from "@/components/lenisWrapper";
import ScrollHint from "@/components/scrollHint";
import DynamicCursor from "@/components/ui/cursor";
import {
  ADDRESS,
  AREA_SERVED,
  EMAIL,
  GITHUB,
  GOOGLE_MAPS,
  LINKEDIN,
  PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from "@/data/site";
import "lenis/dist/lenis.css";
import "./globals.css";


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
    googleBot: { "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
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
      sameAs: [GITHUB, LINKEDIN],
      alumniOf: "Technická univerzita v Liberci",
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "GSAP"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#sluzby`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      email: EMAIL,
      provider: { "@id": `${SITE_URL}/#alex` },
      address: {
        "@type": "PostalAddress",
        addressLocality: ADDRESS.locality,
        addressRegion: ADDRESS.region,
        addressCountry: ADDRESS.country,
      },
      areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
      // sameAs patří identitním profilům; odkaz na zápis v Mapách je hasMap
      sameAs: [GITHUB, LINKEDIN],
      hasMap: GOOGLE_MAPS,
      ...(PHONE ? { telephone: PHONE.replace(/\s/g, "") } : {}),
      priceRange: "12000-45000 CZK",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="cs"
      className={`${jetBrainsMono.variable} antialiased`}
    >
      <body className="min-h-svh flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <LenisSetup>
          <Header />
          {children}
          <ScrollHint />
        </LenisSetup>
        {/* mimo LenisSetup - fixed pozicování se láme uvnitř transformovaného předka */}
        <DynamicCursor />
      </body>
    </html>
  );
}
