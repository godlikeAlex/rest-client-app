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
} satisfies typeof import('@/app/locales/en/signIn').default;
