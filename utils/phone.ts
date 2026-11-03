import { isValidPhoneNumber } from 'libphonenumber-js/max'

// Formats input as +380 XX XXX XX XX while typing
export const formatPhoneNumber = (value: string) => {
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

// Returns a validation message, or '' when the number is a valid Ukrainian one
export const getPhoneError = (phone: string) => {
  if (!phone.trim()) return 'Введіть номер телефону'

  try {
    return isValidPhoneNumber(phone, 'UA') ? '' : 'Введіть коректний український номер'
  } catch {
    return 'Невірний формат номера'
  }
}
