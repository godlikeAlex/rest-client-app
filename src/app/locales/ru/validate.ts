export default {
  validatePasswordLength: 'Пароль должен быть длиной не менее 8 символов.',
  validatePasswordLetterRegex: 'Пароль должен содержать хотя бы 1 букву',
  validatePasswordDigitRegex: 'Пароль должен содержать хотя бы 1 цифру',
  validatePasswordSpecialRegex: 'Пароль должен содержать хотя бы 1 спец.символ',
  validateEmail: 'Неверный адрес электронной почты',
  validateName: 'Имя обязательно для заполнения',
  validateConfirmPassword: 'Пароли не совпадают',
} satisfies typeof import('@/app/locales/en/validate').default;
