export type TVariants = "login"|"register"|"forgot-password"|"reset-password"
export type TInputs = "name"|"email"|"password"|"code"
type TInputsTypes = "text"|"email"|"password"
type TAuthTemplateVariants = {
    [key in TVariants]: {
        title: string,
        footer: {
            text: string,
            linkText: string,
            link: string
        }[],
        inputs: {
            name: TInputs,
            type?: TInputsTypes,
            placeholder: string    
        }[],
        button: string
    };
};

export const authTemplateVariants:TAuthTemplateVariants = {
    login:{
        title: "Вход",
        footer: [
            {
                text: "Вы новый пользователь?",
                linkText: "Зарегистрироваться",
                link: "/register"
            },
            {
                text: "Забыли пароль?",
                linkText: "Восстановить пароль",
                link: "/forgot-password"
            }
        ],
        inputs: [
            {
                name: "email",
                type: "email",
                placeholder: "E-mail"
            },
            {
                name: "password",
                type: "password",
                placeholder: "Пароль"
            }
        ],
        button: "Войти"
    },
    register:{
        title: "Регистрация",
        footer: [{
            text: "Уже зарегистрированы?",
            linkText: "Войти",
            link: "/login"
        }],
        inputs: [
            {
                name: "name",
                placeholder: "Имя"
            },
            {
                name: "email",
                type: "email",
                placeholder: "E-mail"
            },
            {
                name: "password",
                type: "password",
                placeholder: "Пароль"
            }
        ],
        button: "Зарегистрироваться"
    },
    "forgot-password": {
        title: "Восстановление пароля",
        footer: [{
            text: "Вспомнили пароль?",
            linkText: "Войти",
            link: "/login"
        }],
        inputs: [
            {
                name: "email",
                type: "email",
                placeholder: "Укажите e-mail"
            }
        ],
        button: "Восстановить"
    }, 
    "reset-password": {
        title: "Восстановление пароля",
        footer: [{
            text: "Вспомнили пароль?",
            linkText: "Войти",
            link: "/login"
        }],
        inputs: [
            {
                name: "password",
                type: "password",
                placeholder: "Введите новый пароль"
            },
            {
                name: "code",
                placeholder: "Введите код из письма"
            }
        ],
        button: "Сохранить"
    }
}