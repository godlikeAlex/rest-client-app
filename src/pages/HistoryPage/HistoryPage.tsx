import type { loader } from '@/app/routes/history';
import { Accordion } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import RequestCardItem from './components/RequestCardItem/RequestCardItem';
import { FeedbackSection } from '@/components';
import { t } from 'i18next';

export default function HistoryPage() {
  const { history } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  if (history.length === 0) {
    return (
      <FeedbackSection
        status="idle"
        title={t('restClient.idleResponseSection.title')}
        description={t('restClient.idleResponseSection.description')}
      />
    );
  }

  const sortedRequests = [...history].sort((a, b) => b.duration - a.duration);

  return (
    <Accordion variant="separated" radius="xs" chevronPosition="left">
      {sortedRequests.map((request) => (
        <RequestCardItem
          request={request}
          language={i18n.language}
          key={request.id}
        />
      ))}
    </Accordion>
  );
}
