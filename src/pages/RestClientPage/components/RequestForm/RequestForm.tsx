import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button, Flex, Input, Select } from '@mantine/core';
import { IconSend, IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import useRequestForm from '@/pages/RestClientPage/hooks/useRequestForm';
import useHeaders from '@/pages/RestClientPage/hooks/useHeaders';
import useRestState from '@/pages/RestClientPage/hooks/useRestState';
import { UrlTransformerService } from '@/services';
import useFetcherRest from '@/pages/RestClientPage/hooks/useFetcherRest';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export default function RequestForm() {
  const { t, i18n } = useTranslation();
  const fetcher = useFetcherRest();

  const { url = '', method, setMethod, setUrl } = useRequestForm();
  const { body } = useRestState();
  const { headers } = useHeaders();

  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url.length === 0) {
      setError(true);
      return;
    }

    const encodedUrl = UrlTransformerService.encode({
      body,
      method,
      headers,
      url,
    });

    setError(false);

    const actionUrl = `/${i18n.language}/rest-client/${encodedUrl}`;

    window.history.replaceState(null, '', actionUrl);

    fetcher.submit(e.currentTarget, {
      action: actionUrl,
    });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
    setError(false);
  };

  return (
    <fetcher.Form method="POST" onSubmit={handleSubmit}>
      <Flex gap={'sm'} w={'100%'}>
        <Select
          data={METHODS}
          allowDeselect={false}
          value={method}
          onChange={(value) => value && setMethod(value)}
          disabled={fetcher.state === 'submitting'}
        />
        <Input
          placeholder={t('restClient.placeholderUrl')}
          flex={1}
          leftSection={<IconWorld />}
          value={url}
          onChange={handleUrlChange}
          disabled={fetcher.state === 'submitting'}
          error={error}
        />
        <Button
          color="green"
          leftSection={<IconSend />}
          type="submit"
          loading={fetcher.state === 'submitting'}
        >
          {t('restClient.sendButton')}
        </Button>
      </Flex>
    </fetcher.Form>
  );
}
