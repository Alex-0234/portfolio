'use client'

import { useState } from "react"
import Button from "@/components/button"

import { EMAIL } from "@/data/site"

interface ContactFormProps {
    /** předmět e-mailu - u kalkulačky nese název balíčku */
    subject?: string
    /** shrnutí sestavené konfigurace, přiloží se pod zprávu */
    configuration?: string
    className?: string
}

const fieldClasses = 'w-full border border-light/15 bg-transparent px-4 py-3 font-jet text-sm text-light placeholder:text-light/50 focus:border-light/50 focus:outline-none transition-colors'

export default function ContactForm({
    subject = 'Zpráva z webu',
    configuration,
    className = '',
}: ContactFormProps) {
    const [sent, setSent] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const body = [
            `Jméno: ${data.get('name')}`,
            `E-mail: ${data.get('email')}`,
            '',
            String(data.get('message') ?? ''),
            ...(configuration ? ['', '--- Konfigurace ---', configuration] : []),
        ].join('\n')

        // web běží staticky na Cloudflare, takže poptávka odchází z klientova
        // e-mailu - žádný backend, který by se mohl rozbít
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setSent(true)
    }

    return (
        <form onSubmit={onSubmit} className={`flex flex-col gap-4 ${className}`}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input name='name' type='text' required placeholder='Jméno' className={fieldClasses} />
                <input name='email' type='email' required placeholder='E-mail' className={fieldClasses} />
            </div>
            <textarea
                name='message'
                rows={4}
                placeholder='co budeme stavět?'
                className={`${fieldClasses} resize-none`}
            />

            {configuration && (
                <p className='font-jet text-xs text-light/50'>
                    K poptávce se přiloží sestavená konfigurace.
                </p>
            )}

            <div className='flex flex-wrap items-center gap-4'>
                <Button type='submit' variant='solid'>
                    {configuration ? 'Odeslat s konfigurací' : 'Odeslat poptávku'}
                </Button>
                {sent && (
                    <p className='font-jet text-xs text-confirm'>
                        Otevřel se Vám e-mail s vyplněnou poptávkou — stačí odeslat.
                    </p>
                )}
            </div>

            <p className='font-jet text-xs text-light/50'>
                Nebo rovnou na{' '}
                <a href={`mailto:${EMAIL}`} className='text-light/70 underline underline-offset-4 hover:text-light'>
                    {EMAIL}
                </a>
            </p>
        </form>
    )
}
