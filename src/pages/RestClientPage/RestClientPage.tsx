import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Input,
  ScrollArea,
  Select,
  Tabs,
} from '@mantine/core';
import {
  IconWorld,
  IconSend,
  IconList,
  IconJson,
  IconCode,
} from '@tabler/icons-react';

import { WaitingResponseSection } from './components/WaitingResponseSection';
import { HeadersRepeater } from './components/HeadersRepeater';

import { BodyTab } from './components';
import { useTranslation } from 'react-i18next';

export default function RestClientPage() {
  const { t } = useTranslation();

  return (
    <Container mt={25}>
      <Flex gap={'sm'} w={'100%'}>
        <Select
          data={['GET', 'POST', 'PUT', 'DELETE']}
          defaultValue={'GET'}
          allowDeselect={false}
        />
        <Input
          placeholder={t('restClient.placeholderUrl')}
          flex={1}
          leftSection={<IconWorld />}
        />
        <Button color="green" leftSection={<IconSend />}>
          {t('restClient.sendButton')}
        </Button>
      </Flex>

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
            {t('restClient.codeGeneration')}
          </Tabs.Tab>
        </Tabs.List>
        <ScrollArea h={250}>
          <Tabs.Panel value="headers" py="xs">
            <HeadersRepeater />
          </Tabs.Panel>
          <Tabs.Panel value="body" py="xs">
            <BodyTab />
          </Tabs.Panel>
          <Tabs.Panel value="code" py="xs">
            Code Content
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
