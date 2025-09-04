import { ref, computed } from 'vue'

export const useValidateForm = () => {
  const errors = ref<string[]>([])
  const email = ref('')

  const isValidEmail = computed(() => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailTest.test(email.value)
  })

  const showValidateError = (value: string, isCheckboxChecked: boolean) => {
    errors.value = []
    email.value = value

    if (!value || value.trim() === '') {
      errors.value.push('Enter your email address')
    }
    if (!isValidEmail.value) {
      errors.value.push('The email address is incorrect')
    }
    if (!isCheckboxChecked) {
      errors.value.push('Please accept the terms')
    }

    return errors.value.length === 0
  }

  return { showValidateError, errors }
}
