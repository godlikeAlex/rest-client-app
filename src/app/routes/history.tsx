import { requireAuth } from '@/utils/authCheck';
import { Link, useLoaderData } from 'react-router';
import type { Route } from './+types/history';
import HistoryService from '@/services/HistoryService';
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
import { UrlTransformerService } from '@/services';
import { useTranslation } from 'react-i18next';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  if (!user?.uid) return [];
  const history = await HistoryService.getUserHistory(user?.uid);
  return history;
}

export default function History() {
  const requests = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  if (requests.length === 0) {
    return <p>Вы ещё не выполнили не одного запроса.</p>;
  }

  const sortedRequests = [...requests].sort((a, b) => b.duration - a.duration);

  function setColorBadge(method: string) {
    if (method === 'GET') return 'green';
    if (method === 'PUT') return 'red';
    if (method === 'POST') return 'blue';
    if (method === 'DELETE') return 'orange';
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
                <Text size="sm">Status: {request.statusCode}</Text>
                <Text size="sm">Duration: {request.duration} ms</Text>
                <Text size="sm">
                  Timestamp: {new Date(request.timestamp).toLocaleDateString()}
                </Text>
                <Text size="sm">Request size: {request.requestSize} bytes</Text>
                <Text size="sm">
                  Response size: {request.responseSize} bytes
                </Text>
                {request.error && <Text c="red">Error: {request.error}</Text>}

                <Text fw={600}>Headers:</Text>
                <Code block>
                  {JSON.stringify(request.requestData?.headers, null, 2)}
                </Code>

                <Text fw={600}>Body:</Text>
                <Code block>{request.requestData?.body || '-'}</Code>

                <Text fw={600}>Query params:</Text>
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
