import { Flex, Image, Title } from '@mantine/core';
import waitingResponseImage from '@/assets/wating-response.png';
import { useTranslation } from 'react-i18next';

export default function WaitingResponseSection() {
  const { t } = useTranslation();

  return (
    <Flex direction="column" align={'center'}>
      <Image src={waitingResponseImage} height={350} fit="contain" />
      <Title order={4} opacity={0.7}>
        {t('restClient.idleResponseMessage')}
      </Title>
    </Flex>
  );
}
