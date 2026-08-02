import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import LenisSetup from "@/components/lenisWrapper";
import {
  AREA_SERVED,
  EMAIL,
  GITHUB,
  GOOGLE_PROFILE,
  LINKEDIN,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from "@/data/site";
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

// barva adresního řádku na mobilu - drží se pozadí webu, aby chrome prohlížeče
// nekončilo ostrým přechodem do tmavé stránky
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
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "GSAP"],
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
      // konkrétní města místo jednoho "a okolí" - lokální výsledky se páruje
      // na názvy obcí, ne na volný text
      areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
      sameAs: [GITHUB, LINKEDIN, GOOGLE_PROFILE],
      priceRange: "10000-45000 CZK",
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
      className={`${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <LenisSetup>
          <Header />
          {children}
          <div className="fixed bottom-10 w-full flex justify-center">
            <span className='text-white font-jet mix-blend-difference'>↓ scroluj ↓</span>
          </div>
        </LenisSetup>
      </body>
    </html>
  );
}
