'use client'

import { useState, useRef, useEffect } from "react";
import type { CSSProperties, RefObject } from "react";

/* ─────────────────────────────────────────────────────────────
   Kurzor jede na tokenech webu, ne na vlastní paletě - jinak by
   se rozešel s barvami zbytku stránky
   ───────────────────────────────────────────────────────────── */
const LIGHT = "var(--foreground)";
const DARK = "var(--background)";
const DARK_SOFT = "color-mix(in srgb, var(--background) 75%, transparent)";
const CONFIRM = "var(--confirm)";
const CONFIRM_SOFT = "color-mix(in srgb, var(--confirm) 55%, transparent)";
const DIM = "color-mix(in srgb, var(--foreground) 22%, transparent)";
const MONO = "var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* dokud JS kurzor nepřevezme, nechceme nativní schovávat - jinak by při chybě
   nebo vypnutém JS zůstal uživatel úplně bez kurzoru */
const HIDE_NATIVE_CLASS = "has-custom-cursor";

/* velikost, ze které se počítá měřítko - 16px = výchozí velikost písma */
const BASE_FONT = 16;

const clamp = (min: number, v: number, max: number) => Math.min(max, Math.max(min, v));

/* odmocnina, ne přímá úměra: nad nadpisem s 9rem by lineární škálování
   udělalo kolečko přes půl obrazovky */
const ringSize = (f: number) => Math.round(clamp(28, 30 * Math.sqrt(f / BASE_FONT), 84));

/* kurzor v textu kopíruje výšku řádku, jako nativní I-beam */
const caretHeight = (f: number) => Math.round(clamp(16, f * 1.25, 120));

type Size = number | ((fontPx: number) => number);

interface CursorShape {
  /* null = šířka se dopočítá z délky štítku. 'auto' by nešlo animovat,
     takže ji musíme mít jako číslo */
  w: Size | null;
  h: Size;
  /* v procentech, ne v px: 999px se u malého tvaru ořízne na 50 % a při
     přechodu do hranatého se dlouho nic neděje a pak to skočí */
  r: string;
  bg: string;
  bd: string;
  fg: string;
  dot: boolean;
  /* difference drží kurzor viditelný na tmavém i na světlém podkladu -
     bez toho by bílý kurzor zmizel v patičce, která je světlá */
  blend: boolean;
}

const CURSORS = {
  /* tři základní stavy: nic / jde na to najet / jde na to kliknout */
  default: { w: ringSize, h: ringSize, r: "50%", bg: "transparent", bd: `1px solid ${LIGHT}`, fg: LIGHT, dot: true, blend: true },
  hover:   { w: 54, h: 54, r: "50%", bg: "transparent", bd: `1px solid ${LIGHT}`, fg: LIGHT, dot: false, blend: true },
  click:   { w: 60, h: 60, r: "50%", bg: LIGHT, bd: "1px solid transparent", fg: DARK, dot: false, blend: true },

  /* zvláštní případy */
  drag:    { w: 52, h: 52, r: "50%", bg: "transparent", bd: `1px dashed ${LIGHT}`, fg: LIGHT, dot: true, blend: true },
  text:    { w: 2, h: caretHeight, r: "0%", bg: LIGHT, bd: "1px solid transparent", fg: LIGHT, dot: false, blend: true },
  view:    { w: null, h: 30, r: "0%", bg: DARK_SOFT, bd: `1px solid ${CONFIRM_SOFT}`, fg: CONFIRM, dot: false, blend: false },
  off:     { w: 40, h: 40, r: "50%", bg: "transparent", bd: `1px solid ${DIM}`, fg: DIM, dot: false, blend: false },
} satisfies Record<string, CursorShape>;

export type CursorVariant = keyof typeof CURSORS;

function isVariant(value: string | undefined): value is CursorVariant {
  return value !== undefined && value in CURSORS;
}

const resolve = (size: Size, fontPx: number): number =>
  typeof size === "function" ? size(fontPx) : size;

const scales = (shape: CursorShape): boolean =>
  typeof shape.w === "function" || typeof shape.h === "function";

/* ─────────────────────────────────────────────────────────────
   Odkaz a tlačítko poznáme přímo z DOM. data-cursor tak zbývá jen
   na výjimky (hover, view), ne na každý odkaz na webu
   ───────────────────────────────────────────────────────────── */
const TEXT_FIELDS =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, [contenteditable="true"]';

const CLICKABLE = 'a[href], button, [role="button"], summary, select';

const INTERACTIVE = `[data-cursor], ${CLICKABLE}, ${TEXT_FIELDS}`;

/* Safari drží fullscreen pod webkit prefixem */
const fullscreenElement = (): Element | null =>
  document.fullscreenElement ??
  (document as Document & { webkitFullscreenElement?: Element | null }).webkitFullscreenElement ??
  null;

function classify(el: HTMLElement): CursorVariant {
  /* ruční data-cursor má vždy přednost před odhadem */
  if (isVariant(el.dataset.cursor)) return el.dataset.cursor;
  if (el.matches(TEXT_FIELDS)) return "text";
  if (el.matches(":disabled") || el.getAttribute("aria-disabled") === "true") return "off";
  return "click";
}

declare module "react" {
  interface HTMLAttributes<T> {
    "data-cursor"?: CursorVariant;
    "data-cursor-label"?: string;
  }
  interface SVGAttributes<T> {
    "data-cursor"?: CursorVariant;
    "data-cursor-label"?: string;
  }
}

export interface CursorState {
  variant: CursorVariant;
  label: string;
  fontPx: number;
  active: boolean;
  dotRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
}

export function useDynamicCursor(): CursorState {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");
  const [fontPx, setFontPx] = useState(BASE_FONT);
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.18;

    const root = document.documentElement;
    root.classList.add(HIDE_NATIVE_CLASS);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pos };
    let visible = false;
    let fullscreen = false;
    let raf = 0;

    /* setState se volá jen na skutečné změně, ne při každém pohybu myši */
    const show = (): void => {
      if (fullscreen || visible) return;
      visible = true;
      setActive(true);
    };

    const hide = (): void => {
      if (!visible) return;
      visible = false;
      setActive(false);
    };

    const onMove = (e: PointerEvent): void => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      show();
    };

    const onOver = (e: PointerEvent): void => {
      const target = e.target instanceof Element ? e.target : null;
      /* closest bere nejbližšího předka - tlačítko uvnitř hover karty tak
         vyhraje nad kartou samotnou */
      const el = target?.closest<HTMLElement>(INTERACTIVE) ?? null;
      const next = el ? classify(el) : "default";

      setVariant(next);
      setLabel(el?.dataset.cursorLabel ?? "");

      /* getComputedStyle je vynucený přepočet stylů, tak ho pouštíme jen
         u variant, které se velikostí písma opravdu řídí */
      if (target && scales(CURSORS[next])) {
        const size = parseFloat(window.getComputedStyle(target).fontSize);
        if (Number.isFinite(size)) setFontPx(Math.round(size));
      }
    };

    /* opuštění okna: kurzor schováme, ať nezůstane viset u kraje */
    const onLeave = (): void => {
      hide();
      setVariant("default");
      setLabel("");
    };

    /* ve fullscreenu prohlížeč kreslí jen ten jeden prvek, takže naše vrstva
       zmizí - ale cursor: none by platil dál a uživatel by neměl kurzor žádný.
       Na dobu fullscreenu proto vracíme řízení nativnímu kurzoru */
    const onFullscreenChange = (): void => {
      fullscreen = fullscreenElement() !== null;
      if (fullscreen) {
        root.classList.remove(HIDE_NATIVE_CLASS);
        hide();
      } else {
        root.classList.add(HIDE_NATIVE_CLASS);
      }
    };

    const loop = (): void => {
      ring.x += (pos.x - ring.x) * ease;
      ring.y += (pos.y - ring.y) * ease;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove(HIDE_NATIVE_CLASS);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  return { variant, label, fontPx, active, dotRef, ringRef };
}

/* jeden znak JetBrains Mono na 10px + tracking 0.2em, plus vycpávka po stranách */
const LABEL_CHAR = 8;
const LABEL_PAD = 28;

function Cursor({ variant, label, fontPx, active, dotRef, ringRef }: CursorState) {
  const c: CursorShape = CURSORS[variant];

  const shape: CSSProperties = {
    width: c.w === null
      ? Math.max(30, Math.round(label.length * LABEL_CHAR + LABEL_PAD))
      : resolve(c.w, fontPx),
    height: resolve(c.h, fontPx),
    borderRadius: c.r,
    background: c.bg,
    border: c.bd,
    color: c.fg,
    whiteSpace: "nowrap",
    transition:
      "width 260ms cubic-bezier(.2,.9,.3,1), height 260ms cubic-bezier(.2,.9,.3,1), background 220ms, border-radius 260ms, border-color 220ms",
  };

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed left-0 top-0 z-9999 pointer-events-none"
        style={{ opacity: active ? 1 : 0, mixBlendMode: c.blend ? "difference" : "normal" }}
      >
        <div className="grid place-items-center" style={shape}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: label ? 1 : 0,
              /* text čeká, až se tvar přemění - jinak najíždí přes animaci */
              transition: `opacity 200ms ${label ? "200ms" : "0ms"}`,
            }}
          >
            {label}
          </span>
        </div>
      </div>

      <div
        ref={dotRef}
        aria-hidden
        className="fixed left-0 top-0 z-9999 pointer-events-none"
        style={{
          opacity: active && c.dot ? 1 : 0,
          mixBlendMode: c.blend ? "difference" : "normal",
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: 999, background: LIGHT }} />
      </div>
    </>
  );
}

export default function DynamicCursor() {
  const state = useDynamicCursor();
  return <Cursor {...state} />;
}
