export * from './seo'
export * from './phone'

export const goToContacts = () => {
  const contacts = document.getElementById('contacts')
  if (contacts) contacts.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const goToCalculate = () => {
  const calculate = document.getElementById('calculate')
  if (calculate) calculate.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
