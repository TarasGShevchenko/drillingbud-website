'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { FieldError, Reveal } from '@/components'
import { formatPhoneNumber, getPhoneError, PhoneError, trackConversion } from '@/utils'

// Values go to Telegram in Ukrainian whatever the page language; labels are translated
const PILE_TYPES = [
  { key: 'cfa', value: 'CFA (безперервний шнек)' },
  { key: 'casing', value: 'З обсадною трубою' },
  { key: 'advise', value: 'Порадьте' },
] as const

const initialFormData = {
  pileType: PILE_TYPES[0].value as string,
  pileCount: '',
  diameter: '',
  depth: '',
  name: '',
  phone: '',
  comment: '',
}

const inputClass =
  'w-full rounded-2xl border bg-white dark:bg-zinc-800 px-5 py-3.5 text-lg transition focus:outline-none'

const initialErrors = {
  name: '' as '' | 'nameRequired',
  phone: '' as PhoneError,
}

export default function MainCalculation() {
  const t = useTranslations('Calculation')
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
        body: JSON.stringify({ type: 'calculation', ...formData }),
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
    <section id="calculate" className="bg-white py-20 md:py-28 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold text-gh-fg md:text-5xl dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gh-muted dark:text-zinc-400">{t('subtitle')}</p>
        </Reveal>

        {submitted ? (
          <motion.div
            // Shorter than the form it replaces, so it can land above the screen
            ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-3xl border border-emerald-500/30 bg-emerald-900/50 py-16 text-center"
          >
            <p className="text-3xl">✅</p>
            <p className="mt-4 text-2xl font-semibold text-emerald-400">{tForm('thanks')}</p>
            <p className="mt-2 text-zinc-300">{t('success')}</p>
          </motion.div>
        ) : (
          <Reveal className="mt-12">
            <form
              onSubmit={handleSubmit}
              className="grid gap-10 rounded-3xl border border-zinc-800 bg-gh-subtle p-6 md:grid-cols-2 md:p-10 dark:bg-zinc-900"
            >
              <div className="space-y-5">
                <p className="text-xl font-semibold text-gh-fg dark:text-white">{t('params')}</p>

                <fieldset>
                  <legend className="mb-3 text-gh-muted dark:text-zinc-400">{t('pileType')}</legend>
                  <div className="space-y-2">
                    {PILE_TYPES.map(({ key, value }) => (
                      <label key={key} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="pileType"
                          value={value}
                          checked={formData.pileType === value}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <span className="block rounded-2xl border border-zinc-700 bg-white px-5 py-3 transition peer-checked:border-amber-400 peer-checked:text-amber-400 peer-focus-visible:border-white/50 hover:border-zinc-500 dark:bg-zinc-800">
                          {t(`pileTypes.${key}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-2 block text-gh-muted dark:text-zinc-400">
                    {t('pileCount')}
                  </span>
                  <input
                    type="number"
                    name="pileCount"
                    min={1}
                    inputMode="numeric"
                    value={formData.pileCount}
                    onChange={handleChange}
                    placeholder={t('pileCountPlaceholder')}
                    className={`${inputClass} border-zinc-700 focus:border-white/50`}
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-2 block text-gh-muted dark:text-zinc-400">
                      {t('diameter')}
                    </span>
                    <input
                      type="number"
                      name="diameter"
                      min={1}
                      inputMode="numeric"
                      value={formData.diameter}
                      onChange={handleChange}
                      placeholder="300–1500"
                      className={`${inputClass} border-zinc-700 focus:border-white/50`}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-gh-muted dark:text-zinc-400">
                      {t('depth')}
                    </span>
                    <input
                      type="number"
                      name="depth"
                      min={1}
                      inputMode="numeric"
                      value={formData.depth}
                      onChange={handleChange}
                      placeholder={t('depthPlaceholder')}
                      className={`${inputClass} border-zinc-700 focus:border-white/50`}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-xl font-semibold text-gh-fg dark:text-white">{t('contacts')}</p>

                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={tForm('namePlaceholder')}
                    className={`${inputClass} ${
                      errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                    }`}
                  />
                  <FieldError message={errors.name && tForm(errors.name)} />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+380 XX XXX XX XX"
                    className={`${inputClass} ${
                      errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                    }`}
                  />
                  <FieldError message={errors.phone && tForm(errors.phone)} />
                </div>

                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  maxLength={1000}
                  placeholder={t('commentPlaceholder')}
                  className={`${inputClass} flex-1 resize-none border-zinc-700 focus:border-white/50`}
                />

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all hover:bg-amber-400 hover:text-black disabled:opacity-70 dark:bg-white dark:text-black"
                  >
                    {isSubmitting ? tForm('submitting') : t('submit')}
                  </button>
                  <p className="mt-4 text-center text-xs text-gh-muted dark:text-zinc-500">
                    {tForm('consent')}
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  )
}
