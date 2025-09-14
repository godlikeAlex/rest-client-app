import { Flex, LoadingOverlay, Text, Image } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.webp';

import classes from './Loader.module.scss';

interface Props {
  visible: boolean;
}

export default function Loader({ visible }: Props) {
  const { t } = useTranslation();

  const loaderContent = (
    <Flex direction="column" align="center">
      <Image
        className={classes.loaderImage}
        src={logo}
        alt="Hello world"
        h={80}
        w={80}
        fit="contain"
      />

      <Text mt="xs">{t('restClient.fetchingResponseMessage')}</Text>
    </Flex>
  );

  return (
    <LoadingOverlay
      visible={visible}
      loaderProps={{ children: loaderContent }}
      overlayProps={{ radius: 'sm', blur: 5 }}
    />
  );
}
