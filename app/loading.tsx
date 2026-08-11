// Záložní loading UI pro celý strom. Statické stránky (/, /about, /offers,
// /portfolio) jsou předrenderované a prefetchované, takže se fallback u nich
// prakticky neukáže - reálně slouží dynamickým segmentům, které nemají vlastní
// loading.tsx. Bez JS, pozadí shodné s <body>, ať při swapu nic nebliká ani
// neposkočí (žádný CLS).
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Načítání"
      className="flex min-h-svh w-full items-center justify-center bg-dark font-jet"
    >
      <span className="flex gap-2" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-light/60 animate-pulse [animation-delay:-0.3s] motion-reduce:animate-none" />
        <span className="h-2 w-2 rounded-full bg-light/60 animate-pulse [animation-delay:-0.15s] motion-reduce:animate-none" />
        <span className="h-2 w-2 rounded-full bg-light/60 animate-pulse motion-reduce:animate-none" />
      </span>
    </div>
  );
}
