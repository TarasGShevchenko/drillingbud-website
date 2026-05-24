'use client'

import { ChangeEvent, SubmitEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { isValidPhoneNumber } from 'libphonenumber-js/max'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const formatPhoneNumber = (value: string) => {
    let phone = value.replace(/\D/g, '')

    if (phone.startsWith('0')) {
      phone = '380' + phone.slice(1)
    } else if (phone.length > 0 && !phone.startsWith('38')) {
      phone = '38' + phone
    }

    if (phone.length <= 3) return '+' + phone
    if (phone.length <= 5) return `+${phone.slice(0, 3)} ${phone.slice(3)}`
    if (phone.length <= 8) return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5)}`
    if (phone.length <= 10)
      return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`

    return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10, 12)}`
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = { name: '', phone: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Введіть ваше ім'я"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть номер телефону'
      isValid = false
    } else {
      try {
        const isValidUA = isValidPhoneNumber(formData.phone, 'UA')
        if (!isValidUA) {
          newErrors.phone = 'Введіть коректний український номер'
          isValid = false
        }
      } catch {
        newErrors.phone = 'Невірний формат номера'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
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
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', phone: '' })
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
    <div className="mx-auto max-w-2xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white md:text-5xl">Замовити дзвінок</h2>
        <p className="mt-4 text-lg text-zinc-400">
          Залиште контакти — передзвонимо протягом 15 хвилин
        </p>
      </motion.div>

      <div className="mt-12">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/30 bg-emerald-900/50 py-16 text-center"
          >
            <p className="text-3xl">✅</p>
            <p className="mt-4 text-2xl font-semibold text-emerald-400">Дякуємо!</p>
            <p className="mt-2 text-zinc-300">Ми скоро з вами зв&apos;яжемося</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше ім'я"
                className={`w-full rounded-2xl border bg-zinc-800 px-6 py-4 text-lg transition focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-left text-sm text-red-500">{errors.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+380 XX XXX XX XX"
                className={`w-full rounded-2xl border bg-zinc-800 px-6 py-4 text-lg transition focus:outline-none ${
                  errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-white/50'
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-left text-sm text-red-500">{errors.phone}</p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-white py-4 text-lg font-semibold text-black transition-all hover:bg-amber-400 disabled:opacity-70"
              >
                {isSubmitting ? 'Відправляємо...' : 'Замовити дзвінок'}
              </button>
            </motion.div>

            <p className="text-xs text-zinc-500">
              Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
