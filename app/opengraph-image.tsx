import { ImageResponse } from "next/og"

export const alt = 'Alex Liška — freelance webový vývojář z Pardubic'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// vygeneruje se při buildu jako statický PNG, takže za běhu nic nepočítá
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#171717',
                    color: '#ffffff',
                    padding: '64px',
                }}
            >
                <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#8b8b8b' }}>
                    [ PARDUBICE, CZ ]
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: 130, fontWeight: 700, letterSpacing: -4 }}>
                        ALEX LIŠKA
                    </div>
                    <div style={{ display: 'flex', fontSize: 38, color: '#b4b4b4', marginTop: 20 }}>
                        Tvorba webů a webových aplikací na míru
                    </div>
                </div>

                <div style={{ display: 'flex', fontSize: 26, color: '#1fd656' }}>
                    Aktuálně přijímám nové projekty
                </div>
            </div>
        ),
        size,
    )
}
