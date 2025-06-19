<template>
    <form
        action=""
        method="post"
        class="footer-top-form"
        novalidate
        @submit.prevent="isValidateForm"
    >
        <input
            v-model="email"
            type="email"
            class="footer-top-form-input"
            placeholder="Give an email, get the newsletter."
            @focus="showCheckbox = true"
            @blur="validateForm"
        />
        <FooterFormArrow />
        <CustomCheckbox v-if="addCheckbox" v-model="isChecked" />
        <p v-if="errors.length > 0" class="footer-top-form-error">
            {{ errors[0] }}
        </p>
    </form>
</template>

<script setup>
import { useValidateForm } from '@/composables/useValidateForm';
import { useSavedEmails } from '@/composables/useSavedEmails';
const { isMobile } = toRefs(useHeaderMobile());
const { showValidateError, errors } = useValidateForm();

const {
    showCheckbox,
    email,
    isChecked,
    savedEmails,
    saveEmailToLocalStorage,
    resetForm,
} = useSavedEmails();

const addCheckbox = computed(() => {
    return isMobile.value || showCheckbox.value;
});

const validateForm = () => showValidateError(email.value, isChecked.value);

const isValidateForm = async () => {
    if (!validateForm()) return;
    saveEmailToLocalStorage(email.value);
    resetForm();
};

onMounted(() => {
    savedEmails.value = JSON.parse(localStorage.getItem('savesEmails')) || [];
});

watch(isMobile, (newVal) => {
    if (newVal) {
        showCheckbox.value = true;
    }
});
</script>

<style lang="scss">
.footer-top-form {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    max-width: 396px;
    width: 100%;

    @media (max-width: $breakpoints-s) {
        max-width: 100%;
    }

    &-input {
        @include h5(#707070);
        width: 100%;
        padding-bottom: 14px;
        background-color: transparent;

        @media (max-width: $breakpoints-s) {
            @include t-small(#707070);
            padding-bottom: 6px;
        }
    }

    &-error {
        position: absolute;
        bottom: -50px;
        font-size: 12px;
        color: #d82700;
    }
}
</style>
