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
  Title,
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

export default function RestClientPage() {
  return (
    <Container mt={25}>
      <Flex gap={'sm'} w={'100%'}>
        <Select
          data={['GET', 'POST', 'PUT', 'DELETE']}
          defaultValue={'GET'}
          allowDeselect={false}
        />
        <Input placeholder="Enter URL" flex={1} leftSection={<IconWorld />} />
        <Button color="green" leftSection={<IconSend />}>
          Send
        </Button>
      </Flex>

      <Tabs defaultValue="headers" mt="md">
        <Tabs.List>
          <Tabs.Tab
            size={'xs'}
            value="headers"
            leftSection={<IconList size={14} />}
          >
            Headers
          </Tabs.Tab>
          <Tabs.Tab value="body" leftSection={<IconJson size={14} />}>
            Body
          </Tabs.Tab>
          <Tabs.Tab value="code" leftSection={<IconCode size={14} />}>
            Code Generation
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

        <Title order={4}>Response</Title>

        <WaitingResponseSection />
      </Box>
    </Container>
  );
}
