
// řídí canonical, og:url, sitemap i robots — musí sedět na doménu, na které
// web reálně běží, jinak Google indexuje jiný host, než na který ukazuješ
export const SITE_URL = 'https://www.alexliska.dev'

export const SITE_NAME = 'Alex Liška'
// ověřeno proti ARESu (právní forma 101 — FO podnikající dle živnostenského zákona)
export const ICO = '29805473'
export const EMAIL = 'alex.liska04@seznam.cz'

// U lokálních služeb je hovor pořád nejčastější konverze — čeští živnostníci volají.
// Doplň číslo ve tvaru '+420 123 456 789'; dokud je prázdné, kontakt se v patičce
// vůbec nezobrazí, ať tam nesvítí placeholder.
export const PHONE: string = '+420 702 004 668'
// Pevné okno na hovory řeší telefon i nepravidelný režim najednou.
export const PHONE_HOURS = 'volejte 13:00–18:00 v pracovní dny'
// Freelancer nepotřebuje otevírací dobu, potřebuje závazek, kdy odpoví.
// stojí v patičce vedle e-mailu jako protějšek PHONE_HOURS — proto stejný tvar
// (malá písmena, bez tečky), sází se přes microClasses
export const RESPONSE_TIME = 'odpovím do 24 hodin v pracovní dny'
export const GITHUB = 'https://github.com/Alex-0234'
export const LINKEDIN = 'https://www.linkedin.com/in/alexliskadev/'
// Kanonický tvar odkazu na zápis v Mapách — CID je trvalé číslo listingu, takže
// odkaz přežije přejmenování firmy i změnu adresy. Nepoužívat share.google ani
// maps/place/... URL, ty nesou i stav mapy a session parametry.
export const GOOGLE_MAPS = 'https://www.google.com/maps?cid=12848498283916384374'

// města pro lokální SEO — musí odpovídat tomu, co máš na Google Business Profile
export const AREA_SERVED = ['Pardubice', 'Přelouč', 'Chvaletice']

export const ADDRESS = {
    locality: 'Řečany nad Labem',
    region: 'Pardubický kraj',
    country: 'CZ',
}

export const SITE_DESCRIPTION =
    'Freelance webový vývojář z Pardubic. Landing pages, firemní weby a webové aplikace na míru — pevná cena, jasný termín.'

export const THEME_COLOR = '#171717'

export const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''
