export default {
  seo: {
    title: 'Регистрация',
    description:
      'Создайте аккаунт, чтобы отправлять запросы, сохранять переменные и управлять своей работой в мощном REST-клиенте.',
  },
  signUpTitle: 'Регистрация',
  signUpDescription: 'Присоединяйтесь к нам, создав аккаунт.',
  hasAccountMessage: 'Уже есть аккаунт?',
  labels: {
    name: 'Имя',
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтверждение пароля',
  },
  placeholders: {
    name: 'Пожалуйста введите ваше имя',
    email: 'Пожалуйста введите вашу электронную почту',
    password: 'Пожалуйста введите ваш пароль',
    confirmPassword: 'Пожалуйста подвердите пароль',
  },
  button: 'Зарегистрироваться',
  successTitle: 'Добро пожаловать!',
  successMessage: 'Ваш аккаунт был успешно создан',
  errorTitle: 'Ошибка регистрации',
  errorMessage: 'Что-то пошло не так. Пожалуйста, попробуйте еще раз',
} satisfies typeof import('@/app/locales/en/signUp').default;
