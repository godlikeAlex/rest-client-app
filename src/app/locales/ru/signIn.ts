export default {
  seo: {
    title: 'Вход в аккаунт',
    description:
      'Войдите в аккаунт, чтобы отправлять запросы, сохранять переменные и управлять своей работой в мощном REST-клиенте.',
  },
  signInTitle: 'Вход',
  signInDescription: 'Пожалуйста, войдите, чтобы продолжить.',
  noAccountMessage: 'Нет аккаунта?',
  labels: {
    email: 'Email',
    password: 'Пароль',
  },
  placeholders: {
    email: 'Пожалуйста введите вашу электронную почту',
    password: 'Пожалуйста введите ваш пароль',
  },
  button: 'Войти',
  error: 'Неверный логин или пароль',
} satisfies typeof import('@/app/locales/en/signIn').default;
