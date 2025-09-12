import { useTranslation } from 'react-i18next';
import { Box, Container, Divider, ScrollArea, Tabs } from '@mantine/core';
import { IconList, IconJson, IconCode } from '@tabler/icons-react';

import { HeadersRepeater } from './components/HeadersRepeater';
import useFetcherRest from '@/pages/RestClientPage/hooks/useFetcherRest';

import {
  BodyTab,
  CodeGenerationTab,
  RequestForm,
  Loader,
  ResponseSection,
  FeedbackSection,
} from './components';

export default function RestClientPage() {
  const { t } = useTranslation();
  const fetcher = useFetcherRest();

  return (
    <Container py={25} pos={'relative'}>
      <RequestForm />

      <Tabs defaultValue="headers" mt="md">
        <Tabs.List>
          <Tabs.Tab
            size={'xs'}
            value="headers"
            leftSection={<IconList size={14} />}
          >
            {t('restClient.headers')}
          </Tabs.Tab>
          <Tabs.Tab value="body" leftSection={<IconJson size={14} />}>
            {t('restClient.body')}
          </Tabs.Tab>
          <Tabs.Tab value="code" leftSection={<IconCode size={14} />}>
            {t('restClient.codeGeneration.tabTitle')}
          </Tabs.Tab>
        </Tabs.List>
        <ScrollArea h={250} scrollbarSize={5} offsetScrollbars={'y'} pr={5}>
          <Tabs.Panel value="headers" py="xs">
            <HeadersRepeater />
          </Tabs.Panel>
          <Tabs.Panel value="body" py="xs">
            <BodyTab />
          </Tabs.Panel>
          <Tabs.Panel value="code" py="xs">
            <CodeGenerationTab />
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>

      <Box component="section" py="xs" pos="relative">
        <Divider />

        <Loader visible={fetcher.state === 'submitting'} />

        {fetcher.data ? (
          <ResponseSection requestResult={fetcher.data} />
        ) : (
          <FeedbackSection
            status="idle"
            title={t('restClient.idleResponseSection.title')}
            description={t('restClient.idleResponseSection.description')}
          />
        )}
      </Box>
    </Container>
  );
}
