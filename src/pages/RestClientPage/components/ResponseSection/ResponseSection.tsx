import { Box, Flex, SegmentedControl, Text, Title } from '@mantine/core';

import {
  CodeEditor,
  CopyButton,
  FeedbackSection,
  HttpStatusBadge,
} from '@/components';
import type { RequestResult } from '@/services/RequestService';
import { useState } from 'react';
import HeadersViewTable from './HeadersViewTable';
import { useTranslation } from 'react-i18next';

interface Props {
  requestResult: RequestResult;
}

export default function ResponseSection({ requestResult }: Props) {
  const { t } = useTranslation();

  const [selectedSegment, setSelectedSegment] = useState<string>('body');

  if (requestResult.error) {
    return (
      <FeedbackSection
        status="error"
        title={t('restClient.errorResponseMessage')}
        description={requestResult.message}
      />
    );
  }

  return (
    <Box py="md">
      <Flex justify="space-between" align="center" gap={15} mb="xs">
        <Title order={2}>{t('restClient.responseSection.title')}</Title>

        <Flex gap={15} align="center">
          <Flex gap={5} align={'center'}>
            <Text size="sm" c="dimmed">
              {t('restClient.responseSection.statusCode')}:
            </Text>
            <HttpStatusBadge status={requestResult.status} />
          </Flex>

          <Flex gap={5} align={'center'}>
            <Text size="sm" c="dimmed">
              {t('restClient.responseSection.time')}:
            </Text>
            <Text size="sm" c={'green'}>
              {requestResult.time}ms
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex justify={'space-between'} align="center">
        <SegmentedControl
          value={selectedSegment}
          onChange={setSelectedSegment}
          data={[
            {
              value: 'body',
              label: t('restClient.body'),
            },
            {
              value: 'headers',
              label: t('restClient.headers'),
            },
          ]}
        />

        {selectedSegment === 'body' && (
          <CopyButton content={requestResult.data} />
        )}
      </Flex>

      <Box mt="xs">
        {selectedSegment === 'body' ? (
          <CodeEditor
            value={requestResult.data}
            readOnly
            language={requestResult.contentType}
          />
        ) : (
          <HeadersViewTable headers={requestResult.headers} />
        )}
      </Box>
    </Box>
  );
}
