<template>
  <form
    action=""
    method="post"
    class="footer-top-form"
    novalidate
    @submit.prevent="processValidForm"
  >
    <BaseInput
      v-model="email"
      type="email"
      placeholder="Give an email, get the newsletter."
      :error="errors[0]"
      @focus="showCheckbox = true"
      @blur="validateForm"
    />
    <button type="submit" class="footer-top-form-btn">
      <FooterFormArrow />
    </button>
    <BaseCheckbox
      v-if="addCheckbox"
      v-model="isChecked"
      label="i agree to the website’s terms and conditions"
    />
    <SuccessfullNotification v-if="successfulNotification" />
  </form>
</template>

<script setup>
  import { useValidateForm } from '@/composables/useValidateForm'
  import { useSavedEmails } from '@/composables/useSavedEmails'
  import { useHeaderMobile } from '@/stores/mobileVersion'
  import { ref, toRefs, computed, onMounted, watch } from 'vue'

  const { isMobile } = toRefs(useHeaderMobile())
  const { showValidateError, errors } = useValidateForm()
  const showCheckbox = ref(false)
  const email = ref('')
  const isChecked = ref(false)
  const successfulNotification = ref(false)

  const { savedEmails, saveEmailToLocalStorage } = useSavedEmails()

  const addCheckbox = computed(() => {
    return isMobile.value || showCheckbox.value
  })

  const validateForm = () => showValidateError(email.value, isChecked.value)

  const resetForm = () => {
    email.value = ''
    isChecked.value = false
    showCheckbox.value = false
    successfulNotification.value = true
  }

  const removeSuccessfulNotification = () => {
    setTimeout(() => {
      successfulNotification.value = false
    }, 5000)
  }

  const processValidForm = async () => {
    if (!validateForm()) return
    saveEmailToLocalStorage(email.value)
    resetForm()
    removeSuccessfulNotification()
  }

  onMounted(() => {
    savedEmails.value = JSON.parse(localStorage.getItem('savesEmails')) || []
  })

  watch(isMobile, (newVal) => {
    if (newVal) {
      showCheckbox.value = true
    } else {
      showCheckbox.value = false
    }
  })
</script>

<style lang="scss">
  .footer-top-form {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 396px;
    border-bottom: 1px solid #000;

    @media (max-width: $breakpoints-s) {
      max-width: 100%;
    }

    .footer-top-form-btn {
      padding: 12px 0;
      background-color: transparent;

      &:hover {
        .footer-top-form-btn-svg path {
          @extend %transition;

          fill: #000;
        }
      }

      &-svg {
        @media (max-width: $breakpoints-s) {
          width: 15px;
        }
      }
    }
  }
</style>
