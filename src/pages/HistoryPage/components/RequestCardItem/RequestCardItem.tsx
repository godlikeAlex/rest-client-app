import type { RequestData } from '@/services/HistoryService';
import UrlTransformerService from '@/services/UrlTransformerService';
import {
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
import { Link } from 'react-router';

type Props = {
  request: RequestData;
  language: string;
};

type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export default function RequestCardItem({ request, language }: Props) {
  const { t } = useTranslation();

  const BADGE_COLORS: Record<HttpMethod, string> = {
    GET: 'green',
    PUT: 'violet',
    POST: 'blue',
    DELETE: 'red',
  };

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
  const actionUrl = `/${language}/rest-client/${encodedUrl}`;

  return (
    <AccordionItem key={request.id} value={request.id}>
      <AccordionControl>
        <Group>
          <Badge color={BADGE_COLORS[request.method as HttpMethod]}>
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
            {t('history.status')} {request.status}
          </Text>
          <Text size="sm">
            {t('history.duration')} {request.duration} {t('history.ms')}
          </Text>
          <Text size="sm">
            {t('history.timestamp')}{' '}
            {new Date(request.time).toLocaleDateString()}
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
}
