import type { Metadata } from "next"

const description = "Vybrané projekty — osobní, freelance i pracovní. Weby a webové aplikace postavené na míru."

export const metadata: Metadata = {
    title: "Portfolio",
    description,
    alternates: { canonical: "/portfolio" },
    openGraph: { title: "Portfolio | Alex Liška", description, url: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return children
}
