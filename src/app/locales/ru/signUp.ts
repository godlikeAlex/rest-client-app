export default {
  signUpTitle: 'Зарегистрировать аккаунт',
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
  seo: {
    title: 'Страница регистрации',
    description:
      'Создайте аккаунт в REST-клиенте и начните выполнять HTTP-запросы, сохранять историю и управлять заголовками и параметрами.',
  },
} satisfies typeof import('@/app/locales/en/signUp').default;
