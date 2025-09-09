export default {
  seo: {
    title: 'Rest Client - Тестируйте ваш endpoint',
    description:
      'Мощный инструмент для тестирования API и совместной работы, похожий на Postman. Отправляйте запросы, анализируйте ответы, управляйте коллекциями и оптимизируйте рабочий процесс с легкостью.',
  },
  placeholderUrl: 'Введите URL',
  sendButton: 'Отправить',
  headers: 'Заголовки',
  body: 'Тело запроса',
  headersRepeater: {
    key: 'Ключ',
    value: 'Значение',
    addHeader: 'Добавить заголовок',
  },
  idleResponseMessage: 'Отправьте URL, чтобы получить ответ',
  codeGeneration: {
    tabTitle: 'Генерация кода',
    errorTitle: 'Ошибка генерации',
    errorDescription: 'Недостаточно данных для генерации кода.',
    readOnly: 'Режим только для чтения',
  },
} satisfies typeof import('@/app/locales/en/rest-client').default;
