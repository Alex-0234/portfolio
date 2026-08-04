'use client'

import { useState } from "react"
import Button from "@/components/button"

import { EMAIL, FORMSPREE_ENDPOINT } from "@/data/site"

interface ContactFormProps {
    subject?: string
    configuration?: string
    variant?: 'dark' | 'light'
    showEmailNote?: boolean
    className?: string
}

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function ContactForm({
    subject = 'Zpráva z webu',
    configuration,
    variant = 'dark',
    showEmailNote = true,
    className = '',
}: ContactFormProps) {
    const [status, setStatus] = useState<Status>('idle')

    const onLight = variant === 'light'

    const fieldClasses = `w-full border bg-transparent px-3 py-2 font-jet text-xs sm:px-4 sm:py-3 sm:text-sm focus:outline-none transition-colors ${
        onLight
            ? 'border-dark/15 text-dark placeholder:text-dark/50 focus:border-dark/50'
            : 'border-light/15 text-light placeholder:text-light/50 focus:border-light/50'
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
        <form onSubmit={onSubmit} className={`flex flex-col gap-3 sm:gap-4 ${className}`}>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
                <input name='name' type='text' required placeholder='Jméno' className={fieldClasses} />
                <input name='email' type='email' required placeholder='E-mail' className={fieldClasses} />
            </div>
            <textarea
                name='message'
                rows={3}
                placeholder='co budeme stavět?'
                className={`${fieldClasses} min-h-18 resize-none sm:min-h-28`}
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
        </form>
    )
}
