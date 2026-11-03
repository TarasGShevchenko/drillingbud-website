'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { motion } from 'framer-motion'

import { FieldError, Reveal } from '@/components'
import { formatPhoneNumber, getPhoneError } from '@/utils'

const PILE_TYPES = ['CFA (безперервний шнек)', 'З обсадною трубою', 'Порадьте']

const initialFormData = {
  pileType: PILE_TYPES[0],
  pileCount: '',
  diameter: '',
  depth: '',
  name: '',
  phone: '',
  comment: '',
}

const inputClass =
  'w-full rounded-2xl border bg-zinc-800 px-5 py-3.5 text-lg transition focus:outline-none'

export default function MainCalculation() {
  const [formData, setFormData] = useState(initialFormData)

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  })

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
      name: formData.name.trim() ? '' : "Введіть ваше ім'я",
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

      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData(initialFormData)
        setErrors({ name: '', phone: '' })
      }, 4000)
    } catch (error) {
      console.error('Error send msg:', error)
      alert('Помилка відправки')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="calculate" className="bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Безкоштовний розрахунок вартості
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Вкажіть параметри паль — порахуємо вартість і зателефонуємо з пропозицією
          </p>
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
            <p className="mt-4 text-2xl font-semibold text-emerald-400">Дякуємо!</p>
            <p className="mt-2 text-zinc-300">Зробимо розрахунок і зв&apos;яжемося з вами</p>
          </motion.div>
        ) : (
          <Reveal className="mt-12">
            <form
              onSubmit={handleSubmit}
              className="grid gap-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:grid-cols-2 md:p-10"
            >
              <div className="space-y-5">
                <p className="text-xl font-semibold text-white">Параметри паль</p>

                <fieldset>
                  <legend className="mb-3 text-zinc-400">Тип палі</legend>
                  <div className="space-y-2">
                    {PILE_TYPES.map((type) => (
                      <label key={type} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="pileType"
                          value={type}
                          checked={formData.pileType === type}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <span className="block rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-3 transition peer-checked:border-amber-400 peer-checked:text-amber-400 peer-focus-visible:border-white/50 hover:border-zinc-500">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-2 block text-zinc-400">Кількість паль</span>
                  <input
                    type="number"
                    name="pileCount"
                    min={1}
                    inputMode="numeric"
                    value={formData.pileCount}
                    onChange={handleChange}
                    placeholder="Наприклад, 40"
                    className={`${inputClass} border-zinc-700 focus:border-white/50`}
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-2 block text-zinc-400">Діаметр, мм</span>
                    <input
                      type="number"
                      name="diameter"
                      min={1}
                      inputMode="numeric"
                      value={formData.diameter}
                      onChange={handleChange}
                      placeholder="300–800"
                      className={`${inputClass} border-zinc-700 focus:border-white/50`}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-zinc-400">Глибина, м</span>
                    <input
                      type="number"
                      name="depth"
                      min={1}
                      inputMode="numeric"
                      value={formData.depth}
                      onChange={handleChange}
                      placeholder="до 25"
                      className={`${inputClass} border-zinc-700 focus:border-white/50`}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-xl font-semibold text-white">Ваші контакти</p>

                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше ім'я"
                    className={`${inputClass} ${
                      errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                    }`}
                  />
                  <FieldError message={errors.name} />
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
                  <FieldError message={errors.phone} />
                </div>

                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  maxLength={1000}
                  placeholder="Коментар: тип об'єкта, ґрунт, адреса (необов'язково)"
                  className={`${inputClass} flex-1 resize-none border-zinc-700 focus:border-white/50`}
                />

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-white py-4 text-lg font-semibold text-black transition-all hover:bg-amber-400 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Відправляємо...' : 'Розрахувати вартість'}
                  </button>
                  <p className="mt-4 text-center text-xs text-zinc-500">
                    Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
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
