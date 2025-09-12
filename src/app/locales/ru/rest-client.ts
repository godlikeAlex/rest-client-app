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
  idleResponseSection: {
    title: 'Готов к запросу!',
    description:
      'Введите URL и нажмите "Отправить", чтобы отправить запрос и увидеть результат.',
  },
  errorResponseMessage: 'Упс, что-то пошло не так...',
  codeGeneration: {
    tabTitle: 'Генерация кода',
    errorTitle: 'Ошибка генерации',
    errorDescription: 'Недостаточно данных для генерации кода.',
  },
  fetchingResponseMessage: 'Обрабатываем ваш запрос...',
  responseSection: {
    title: 'Ответ',
    statusCode: 'Статус-код',
    time: 'Время выполнения',
  },
} satisfies typeof import('@/app/locales/en/rest-client').default;
