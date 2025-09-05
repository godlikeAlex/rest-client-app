import { Flex, Image, Title } from '@mantine/core';
import waitingResponseImage from '@/assets/wating-response.png';

export default function WaitingResponseSection() {
  return (
    <Flex direction="column" align={'center'}>
      <Image src={waitingResponseImage} height={350} fit="contain" />
      <Title order={4} opacity={0.7}>
        Submit URL to get a response
      </Title>
    </Flex>
  );
}
