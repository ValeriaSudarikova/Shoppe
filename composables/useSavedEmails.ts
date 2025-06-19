export const useSavedEmails = () => {
    const showCheckbox = ref(false);
    const email = ref('');
    const isChecked = ref(false);
    const savedEmails = ref<string[]>([]);

    const saveEmailToLocalStorage = (email: string) => {
        const data = localStorage.getItem('savedEmails');
        const emails: string[] = data ? JSON.parse(data) : [];
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('savedEmails', JSON.stringify(emails));
        }
    };

    const resetForm = () => {
        email.value = '';
        isChecked.value = false;
    };

    return {
        showCheckbox,
        email,
        isChecked,
        savedEmails,
        saveEmailToLocalStorage,
        resetForm,
    };
};
