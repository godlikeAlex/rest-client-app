import { Flex, Image, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import waitingResponseImage from '@/assets/waiting-response.webp';

export default function WaitingResponseSection() {
  const { t } = useTranslation();

  return (
    <Flex direction="column" align={'center'} py={'lg'}>
      <Image
        src={waitingResponseImage}
        height={350}
        fit="contain"
        alt="Waiting your response"
      />
      <Title order={4} opacity={0.7} mt={'lg'}>
        {t('restClient.idleResponseMessage')}
      </Title>
    </Flex>
  );
}
