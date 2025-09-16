import type { loader } from '@/app/routes/history';
import UrlTransformerService from '@/services/UrlTransformerService';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Code,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData } from 'react-router';

export default function HistoryPage() {
  const { history } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();

  if (history.length === 0) {
    return <p>Вы ещё не выполнили не одного запроса.</p>;
  }

  const sortedRequests = [...history].sort((a, b) => b.duration - a.duration);

  function setColorBadge(method: string) {
    if (method === 'GET') return 'green';
    if (method === 'PUT') return 'violet';
    if (method === 'POST') return 'blue';
    return 'red';
  }

  return (
    <Accordion variant="separated" radius="xs" chevronPosition="left">
      {sortedRequests.map((request) => {
        const encodedUrl = UrlTransformerService.encode({
          url: request.url,
          body: request.requestData?.body || '',
          headers: Array.isArray(request.requestData?.headers)
            ? request.requestData.headers.map((h) => ({
                key: h.key,
                value: h.value,
                enabled: !!h.enabled,
              }))
            : [],
          method: request.method,
        });
        const actionUrl = `/${i18n.language}/rest-client/${encodedUrl}`;

        return (
          <AccordionItem key={request.id} value={request.id}>
            <AccordionControl>
              <Group>
                <Badge color={setColorBadge(request.method)}>
                  {request.method}
                </Badge>
                <Button component={Link} to={actionUrl} variant="transparent">
                  {request.url}
                </Button>
              </Group>
            </AccordionControl>
            <AccordionPanel>
              <Stack gap="xs">
                <Text size="sm">
                  {t('history.status')} {request.statusCode}
                </Text>
                <Text size="sm">
                  {t('history.duration')} {request.duration} {t('history.ms')}
                </Text>
                <Text size="sm">
                  {t('history.timestamp')}{' '}
                  {new Date(request.timestamp).toLocaleDateString()}
                </Text>
                <Text size="sm">
                  {t('history.requestSize')} {request.requestSize}{' '}
                  {t('history.bytes')}
                </Text>
                <Text size="sm">
                  {t('history.responseSize')} {request.responseSize}{' '}
                  {t('history.bytes')}
                </Text>
                {request.error && (
                  <Text c="red">
                    {t('history.error')} {request.error}
                  </Text>
                )}

                <Text fw={600}>{t('history.headers')}</Text>
                <Code block>
                  {JSON.stringify(request.requestData?.headers, null, 2)}
                </Code>

                <Text fw={600}>{t('history.body')}</Text>
                <Code block>{request.requestData?.body || '-'}</Code>

                <Text fw={600}>{t('history.queryParams')}</Text>
                <Code block>
                  {JSON.stringify(request.requestData?.queryParams, null, 2)}
                </Code>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
