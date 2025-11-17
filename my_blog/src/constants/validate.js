export const EMAIL_REQUIREMENTS = [
    {
        type: "emailFormat",
        short_msg: `Формат соответствует Email`,
        message: `Пример user_123@example.com`,
        validate: (email) => /^\w+@\w+\.\w+$/.test(email),
        required: true
    }
]

export const PASSWORD_REQUIREMENTS = [
    {
        type: "min_length",
        short_msg: `Длина пароля - 8 символов`,
        message: `Пароль должен быть не менее 8 символов`,
        validate: (pwd) => pwd.length >= 8,
        required: true
    },
    {
        type: "uppercase",
        short_msg: `Заглавные буквы A-Z`,
        message: 'Пароль должен содержать, хотя бы одну латинскую букву в верхнем регистре',
        validate: (pwd) => /[A-Z]/.test(pwd),
        required: true
    },
    {
        type: "lowercase",
        short_msg: `Строчные буквы a-z`,
        message: 'Пароль должен содержать, хотя бы одну латинскую букву в нижнем регистре',
        validate: (pwd) => /[a-z]/.test(pwd),
        required: true
    },
    {
        type: "digits",
        short_msg: `Арабские цифры 0-9`,
        message: 'Пароль должен содержать, хотя бы одну арабскую цифру',
        validate: (pwd) => /[0-9]/.test(pwd),
        required: true
    },
    {
        type: "special_chars",
        short_msg: `Спец символы !@#$%^&*()_+-=[]{};\'"|,.<>/?`,
        message: 'Пароль должен содержать, хотя бы один специальный символ: !@#$%^&*()_+-=[]{};\'"|,.<>/?',
        validate: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
        required: true
    }
]

export const PASSWORD_MATCHED = [
    {
        type: "isMatched",
        short_msg: `Пароли совпадают`,
        message: 'Пароли должны совпадать',
        validate: (pwd1, pwd2) => pwd1 === pwd2,
        required: true
    }
]

export const EMAIL_MATCHED = [
    {
        type: "isNotMatched",
        short_msg: `Email должны отличаться`,
        message: 'Email должны отличаться',
        validate: (email1, email2) => email1 !== email2,
        required: true
    }
]