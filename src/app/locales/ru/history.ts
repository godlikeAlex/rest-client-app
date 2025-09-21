export default {
  status: 'Статус:',
  duration: 'Продолжительность:',
  timestamp: 'Дата создания:',
  requestSize: 'Размер запроса:',
  responseSize: 'Размер ответа:',
  error: 'Ошибка:',
  headers: 'Заголовки:',
  body: 'Тело запроса:',
  queryParams: 'Параметры:',
  bytes: 'байт',
  ms: 'мс',
  seo: {
    title: 'Страница истории',
    description:
      'Просматривайте, анализируйте и повторно выполняйте ваши прошлые HTTP-запросы. Удобный доступ к статусам, заголовкам, телу и параметрам каждого запроса.',
  },
  noDataSection: {
    title: 'История пуста',
    description:
      'Здесь появятся ваши API-запросы, как только вы начнёте их выполнять.',
  },
  makeRequest: 'Сделать первый запрос',
  sortBy: 'Сортировать по',
  sort: {
    slow: 'Минимальное время отклика',
    fast: 'Максимальное время отклика',
  },
} satisfies typeof import('@/app/locales/en/history').default;
