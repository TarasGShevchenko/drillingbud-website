export const goToContacts = () => {
  const contacts = document.getElementById('contacts')
  console.log('contacts', contacts)
  contacts && contacts.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
