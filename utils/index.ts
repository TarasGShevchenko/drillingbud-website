export const goToContacts = () => {
  const contacts = document.getElementById('contacts')
  if (contacts) contacts.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
