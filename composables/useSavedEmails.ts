import { ref } from 'vue'

export const useSavedEmails = () => {
  const savedEmails = ref<string[]>([])

  const saveEmailToLocalStorage = (email: string) => {
    const data = localStorage.getItem('savedEmails')
    const emails: string[] = data ? JSON.parse(data) : []
    if (!emails.includes(email)) {
      emails.push(email)
      localStorage.setItem('savedEmails', JSON.stringify(emails))
    }
  }

  return {
    savedEmails,
    saveEmailToLocalStorage,
  }
}
