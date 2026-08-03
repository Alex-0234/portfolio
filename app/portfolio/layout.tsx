import Footer from "@/components/footer"
import { pageMetadata } from "@/utils/metadata"

export const metadata = pageMetadata({
    title: "Portfolio",
    description: "Vybrané projekty — osobní, freelance i pracovní. Weby a webové aplikace postavené na míru.",
    path: "/portfolio",
})

// stránka sama je interaktivní, takže metadata musí viset o patro výš
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
        return (<>
            {children}
            <Footer bg_color='light' />
            </>

        )
    }