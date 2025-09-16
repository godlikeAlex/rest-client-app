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
} satisfies typeof import('@/app/locales/en/history').default;
