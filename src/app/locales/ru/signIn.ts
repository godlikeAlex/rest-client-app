export default {
  signInTitle: 'Авторизация',
  labels: {
    email: 'Электронная почта',
    password: 'Пароль',
  },
  placeholders: {
    email: 'Пожалуйста введите вашу электронную почту',
    password: 'Пожалуйста введите ваш пароль',
  },
  button: 'Войти',
  error: 'Неверный логин или пароль',
  seo: {
    title: 'Страница входа',
    description:
      'Войдите в свой аккаунт REST-клиента, чтобы продолжить работу с историей запросов, настройками и персональными данными.',
  },
} satisfies typeof import('@/app/locales/en/signIn').default;
