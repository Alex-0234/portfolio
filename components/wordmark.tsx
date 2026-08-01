// SVG podpis do headeru — text je vysázený v JetBrains Mono (monospace = předvídatelná šířka),
// viewBox je spočítaný z advance width 0.6em, takže SVG má pevný poměr stran a stačí mu zadat výšku.
export default function Wordmark({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox='0 0 700 120'
            preserveAspectRatio='xMinYMid meet'
            role='img'
            aria-label='Alex Liška'
            className={className}
        >
            <text
                x='0'
                y='100'
                fill='currentColor'
                letterSpacing='6'
                fontSize='100'
                fontWeight='700'
                className='font-jet'
            >
                ALEX LIŠKA
            </text>
            <rect x='674' y='88' width='12' height='12' fill='currentColor' />
        </svg>
    )
}
