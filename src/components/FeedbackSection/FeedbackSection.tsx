import { Flex, Image, Text, Title } from '@mantine/core';
import waitingResponseImage from '@/assets/hello.webp';
import errorResponseImage from '@/assets/error-response.webp';

type FeedbackStatus = 'idle' | 'error';

interface Props {
  status: FeedbackStatus;
  title?: string;
  description?: string;
}

const SECTION_IMAGES: Record<FeedbackStatus, string> = {
  idle: waitingResponseImage,
  error: errorResponseImage,
};

export default function FeedbackSection({ status, title, description }: Props) {
  const image = SECTION_IMAGES[status];

  return (
    <Flex direction="column" align={'center'} py={'lg'}>
      <Image src={image} height={300} fit="contain" alt={title} />
      <Title order={4} opacity={0.7} mt={'lg'}>
        {title}
      </Title>

      {description && <Text c="dimmed">{description}</Text>}
    </Flex>
  );
}
