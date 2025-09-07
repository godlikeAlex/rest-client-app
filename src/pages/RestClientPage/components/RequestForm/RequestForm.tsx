import { Box, Button, Flex, Input, Select } from '@mantine/core';
import { IconSend, IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import useRequestForm from '@/pages/RestClientPage/hooks/useRequestForm';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export default function RequestForm() {
  const { t } = useTranslation();

  const { url, method, setMethod, setUrl } = useRequestForm();

  return (
    <Box component="form">
      <Flex gap={'sm'} w={'100%'}>
        <Select
          data={METHODS}
          allowDeselect={false}
          value={method}
          onChange={(value) => value && setMethod(value)}
        />
        <Input
          placeholder={t('restClient.placeholderUrl')}
          flex={1}
          leftSection={<IconWorld />}
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
        />
        <Button color="green" leftSection={<IconSend />}>
          {t('restClient.sendButton')}
        </Button>
      </Flex>
    </Box>
  );
}
