import { Box, Container, Divider, ScrollArea, Tabs } from '@mantine/core';
import { IconList, IconJson, IconCode } from '@tabler/icons-react';

import { WaitingResponseSection } from './components/WaitingResponseSection';
import { HeadersRepeater } from './components/HeadersRepeater';

import { BodyTab, CodeGenerationTab, RequestForm } from './components';
import { useTranslation } from 'react-i18next';

export default function RestClientPage() {
  const { t } = useTranslation();

  return (
    <Container mt={25}>
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

      <Box component="section" py="xs">
        <Divider />

        <WaitingResponseSection />
      </Box>
    </Container>
  );
}
