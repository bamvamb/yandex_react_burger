export type Variants = "login"|"register"|"forgot-password"|"reset-password"
export type Inputs = "name"|"email"|"password"|"code"
type InputsTypes = "text"|"email"|"password"
type AuthTemplateVariants = {
    [key in Variants]: {
        title: string,
        footer: {
            text: string,
            link_text: string,
            link: string
        }[],
        inputs: {
            name: Inputs,
            type?: InputsTypes,
            placeholder: string    
        }[],
        button: string
    };
};

export const authTemplateVariants:AuthTemplateVariants = {
    login:{
        title: "Вход",
        footer: [
            {
                text: "Вы новый пользователь?",
                link_text: "Зарегистрироваться",
                link: "/register"
            },
            {
                text: "Забыли пароль?",
                link_text: "Восстановить пароль",
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
            link_text: "Войти",
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
            link_text: "Войти",
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
            link_text: "Войти",
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