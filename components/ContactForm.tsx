'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { FieldError, Reveal } from '@/components'
import { formatPhoneNumber, getPhoneError, PhoneError, trackConversion } from '@/utils'

// Values go to Telegram in Ukrainian whatever the page language; labels are translated
const CALL_TIMES = [
  { key: 'now', value: 'Зараз' },
  { key: 'today', value: 'Сьогодні' },
  { key: 'tomorrow', value: 'Завтра' },
] as const

const initialFormData = {
  name: '',
  phone: '',
  callTime: CALL_TIMES[0].value as string,
  comment: '',
}

const initialErrors = {
  name: '' as '' | 'nameRequired',
  phone: '' as PhoneError,
}

export default function ContactForm() {
  const t = useTranslations('ContactForm')
  const tForm = useTranslations('Form')

  const [formData, setFormData] = useState(initialFormData)

  const [errors, setErrors] = useState(initialErrors)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() ? ('' as const) : ('nameRequired' as const),
      phone: getPhoneError(formData.phone),
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.phone
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'callback', ...formData }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      trackConversion('lead')
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData(initialFormData)
        setErrors(initialErrors)
      }, 4000)
    } catch (error) {
      console.error('Error send msg:', error)
      alert(tForm('sendError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <Reveal>
        <h2 className="text-4xl font-bold text-gh-fg md:text-5xl dark:text-white">{t('title')}</h2>
        <p className="mt-4 text-lg text-gh-muted dark:text-zinc-400">{t('subtitle')}</p>
      </Reveal>

      <div className="mt-12">
        {submitted ? (
          <motion.div
            // Shorter than the form it replaces, so it can land above the screen
            ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/30 bg-emerald-900/50 py-16 text-center"
          >
            <p className="text-3xl">✅</p>
            <p className="mt-4 text-2xl font-semibold text-emerald-400">{tForm('thanks')}</p>
            <p className="mt-2 text-zinc-300">{t('success')}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Reveal>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={tForm('namePlaceholder')}
                className={`w-full rounded-2xl border bg-white px-6 py-4 text-lg transition focus:outline-none dark:bg-zinc-800 ${
                  errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                }`}
              />
              <FieldError message={errors.name && tForm(errors.name)} />
            </Reveal>

            <Reveal delay={0.1}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+380 XX XXX XX XX"
                className={`w-full rounded-2xl border bg-white px-6 py-4 text-lg transition focus:outline-none dark:bg-zinc-800 ${
                  errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                }`}
              />
              <FieldError message={errors.phone && tForm(errors.phone)} />
            </Reveal>

            <Reveal delay={0.1}>
              <fieldset>
                <legend className="mb-3 text-left text-gh-muted dark:text-zinc-400">
                  {t('callTime')}
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  {CALL_TIMES.map(({ key, value }) => (
                    <label key={key} className="cursor-pointer">
                      <input
                        type="radio"
                        name="callTime"
                        value={value}
                        checked={formData.callTime === value}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <span className="block rounded-2xl border border-zinc-700 bg-white py-3 text-lg transition peer-checked:border-amber-400 peer-checked:text-amber-400 peer-focus-visible:border-white/50 hover:border-zinc-500 dark:bg-zinc-800">
                        {t(`callTimes.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </Reveal>

            <Reveal delay={0.2}>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                placeholder={t('commentPlaceholder')}
                className="w-full resize-none rounded-2xl border border-zinc-700 bg-white px-6 py-4 text-lg transition focus:border-white/50 focus:outline-none dark:bg-zinc-800"
              />
            </Reveal>

            <Reveal delay={0.2}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all hover:bg-amber-400 hover:text-black disabled:opacity-70 dark:bg-white dark:text-black"
              >
                {isSubmitting ? tForm('submitting') : t('submit')}
              </button>

              <p className="mt-6 text-xs text-gh-muted dark:text-zinc-500">{tForm('consent')}</p>
            </Reveal>
          </form>
        )}
      </div>
    </div>
  )
}
