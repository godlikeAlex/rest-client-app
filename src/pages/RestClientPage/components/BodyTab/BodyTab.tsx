import { CodeEditor } from '@/components';
import useRestState from '@/pages/RestClientPage/hooks/useRestState';
import { RequestService } from '@/services';
import { Button, Flex, Group, Radio } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BodyTab() {
  const { body, setBody } = useRestState();
  const [contentType, setContentType] = useState('json');
  const { t } = useTranslation();

  const handlePrettify = async () => {
    try {
      const data = await RequestService.beautifyData(
        'application/json',
        JSON.parse(body)
      );

      if (!data) return;

      setBody(data);
    } catch {
      notifications.show({
        message: t('restClient.errorPrettify'),
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Radio.Group
          value={contentType}
          onChange={setContentType}
          label="Content Type"
          size="sm"
          mb="lg"
        >
          <Group gap="xs">
            <Radio size="xs" value="json" label="Json" />
            <Radio size="xs" value="plain-text" label="Plain text" />
          </Group>
        </Radio.Group>

        <Button
          color="pink"
          variant="light"
          disabled={contentType !== 'json'}
          onClick={handlePrettify}
        >
          Prettify
        </Button>
      </Flex>

      <CodeEditor
        value={body}
        onChange={(code) => setBody(code)}
        type={contentType === 'json' ? 'code' : 'area'}
      />
    </>
  );
}
