
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import LenisSetup from "@/components/lenisWrapper";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// latin-ext carries the czech diacritics (ě š č ř ž ů í á é)
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Tvorba webových stránek | Alex Liška - Pardubice a okolí",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisSetup>
          <Header />
          {children}
          <div className="fixed bottom-10 w-full flex justify-center">
            <span className=' mix-blend-difference font-jet'>↓ scroluj ↓</span>
          </div>
        </LenisSetup>
      </body>
    </html>
  );
}
