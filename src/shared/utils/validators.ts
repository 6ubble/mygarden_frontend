export const validationRules = {
    required: (fieldName: string) => ({
        required: `${fieldName} обязательно`
    }),

    email: {
        required: 'Email обязателен',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Некорректный формат email'
        }
    },

    password: {
        required: 'Пароль обязателен',
        minLength: {
            value: 6,
            message: 'Минимум 6 символов'
        }
    }
};