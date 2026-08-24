'use client'

import { useState } from "react"
import Link from "next/link"
import Button from "@/components/button"

import { EMAIL, FORMSPREE_ENDPOINT } from "@/data/site"

interface ContactFormProps {
    subject?: string
    configuration?: string
    variant?: 'dark' | 'light'
    showEmailNote?: boolean
    /* patička na mobilu bojuje o každý řádek — compact sáhne po dvou sloupcích
       u jména a e-mailu, nižším textareu a menší poznámce o údajích. Od sm: je
       výsledek stejný jako bez compactu. */
    compact?: boolean
    className?: string
}

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function ContactForm({
    subject = 'Zpráva z webu',
    configuration,
    variant = 'dark',
    showEmailNote = true,
    compact = false,
    className = '',
}: ContactFormProps) {
    const [status, setStatus] = useState<Status>('idle')

    const onLight = variant === 'light'

    /* krytí rámečků drží WCAG 1.4.11 (non-text contrast, min. 3:1 vůči pozadí) —
       na bílé to vychází na 50 %, na tmavé na 40 %. Níž jdou pole opticky ztratit. */
    const fieldClasses = `w-full border bg-transparent px-3 py-2 font-jet text-xs sm:px-4 sm:py-3 sm:text-sm focus:outline-none transition-colors ${
        onLight
            ? 'border-dark/50 text-dark placeholder:text-dark/60 focus:border-dark'
            : 'border-light/40 text-light placeholder:text-light/60 focus:border-light'
    }`
    const muted = onLight ? 'text-dark/50' : 'text-light/50'
    const link = onLight
        ? 'text-dark/70 hover:text-dark'
        : 'text-light/70 hover:text-light'

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)

        if (!FORMSPREE_ENDPOINT) {
            const body = [
                `Jméno: ${data.get('name')}`,
                `E-mail: ${data.get('email')}`,
                '',
                String(data.get('message') ?? ''),
                ...(configuration ? ['', '--- Konfigurace ---', configuration] : []),
            ].join('\n')

            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setStatus('mailto')
            return
        }

        data.append('_subject', subject)
        if (configuration) data.append('Konfigurace', configuration)

        setStatus('sending')

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data,
            })

            if (!res.ok) throw new Error(String(res.status))

            form.reset()
            setStatus('sent')
        } catch {
            setStatus('error')
        }
    }

    return (
        <form onSubmit={onSubmit} className={`flex flex-col ${compact ? 'gap-2.5' : 'gap-3'} sm:gap-4 ${className}`}>
            <div className={`grid gap-3 sm:grid-cols-2 sm:gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <input name='name' type='text' required placeholder='Jméno' className={fieldClasses} />
                <input name='email' type='email' required placeholder='E-mail' className={fieldClasses} />
            </div>
            <textarea
                name='message'
                rows={3}
                placeholder='co budeme stavět?'
                className={`${fieldClasses} resize-none sm:min-h-28 ${compact ? 'min-h-16' : 'min-h-18'}`}
            />

            {configuration && (
                <p className={`font-jet text-xs ${muted}`}>
                    K poptávce se přiloží sestavená konfigurace.
                </p>
            )}

            <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
                <Button type='submit' variant='solid' size='fluid' surface={variant} disabled={status === 'sending'}>
                    {status === 'sending'
                        ? 'Odesílám…'
                        : configuration ? 'Odeslat s konfigurací' : 'Odeslat poptávku'}
                </Button>

                {status === 'sent' && (
                    <p role='status' className='font-jet text-xs text-confirm'>
                        Děkuju, zpráva dorazila. Ozvu se Vám co nejdřív.
                    </p>
                )}
                {status === 'mailto' && (
                    <p role='status' className='font-jet text-xs text-confirm'>
                        Otevřel se Vám e-mail s vyplněnou poptávkou — stačí odeslat.
                    </p>
                )}
                {status === 'error' && (
                    <p role='status' className={`font-jet text-xs ${link}`}>
                        Odeslání se nepovedlo. Zkuste to prosím znovu, nebo mi napište přímo na e-mail níž.
                    </p>
                )}
            </div>

            {showEmailNote && (
                <p className={`font-jet text-xs ${muted}`}>
                    Nebo rovnou na{' '}
                    <a href={`mailto:${EMAIL}`} className={`underline underline-offset-4 ${link}`}>
                        {EMAIL}
                    </a>
                </p>
            )}

            <p className={`font-jet ${compact ? 'text-[0.65rem] leading-snug' : 'text-xs'} sm:text-xs ${muted}`}>
                Vyplněné údaje použiju jen k odpovědi na Vaši poptávku —{' '}
                <Link href='/ochrana-osobnich-udaju' className={`py-1.5 underline underline-offset-4 ${link}`}>
                    jak nakládám s osobními údaji
                </Link>
            </p>
        </form>
    )
}
