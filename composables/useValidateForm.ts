export const useValidateForm = () => {
    const errors = ref<string[]>([]);

    const isValidateEmail = (email: string): boolean => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailTest.test(email);
    };

    const showValidateError = (value: string, isCheckboxChecked: boolean) => {
        errors.value = [];

        if (!value || value.trim() === '') {
            errors.value.push('Enter your email address');
        }
        if (!isValidateEmail(value)) {
            errors.value.push('The email address is incorrect');
        }
        if (!isCheckboxChecked) {
            errors.value.push('Please accept the terms');
        }

        return errors.value.length === 0;
    };

    return { showValidateError, errors };
};
