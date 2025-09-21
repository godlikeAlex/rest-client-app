import type { loader } from '@/app/routes/history';
import { Accordion, Button, Container, Flex } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import RequestCardItem from './components/RequestCardItem/RequestCardItem';
import { FeedbackSection, LocaleLink } from '@/components';
import { t } from 'i18next';

export default function HistoryPage() {
  const { history } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  if (history.length === 0) {
    return (
      <Container>
        <Flex justify="center" align="center" direction="column" mih={'85vh'}>
          <FeedbackSection
            status="error"
            title={t('history.noDataSection.title')}
            description={t('history.noDataSection.description')}
          />
          <Button component={LocaleLink} to="/rest-client">
            {t('history.makeRequest')}
          </Button>
        </Flex>
      </Container>
    );
  }

  const sortedRequests = history.sort((a, b) => {
    return b.duration - a.duration;
  });

  return (
    <Container size="xl" py="xl">
      <Accordion variant="separated" radius="xs" chevronPosition="left">
        {sortedRequests.map((request) => (
          <RequestCardItem
            request={request}
            language={i18n.language}
            key={request.id}
          />
        ))}
      </Accordion>
    </Container>
  );
}
