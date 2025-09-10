import { Group, Text, Divider, Stack, Anchor, Image } from '@mantine/core';
import logoRS from '@/assets/rs_school.svg';

export default function Footer() {
  return (
    <>
      <Divider />
      <Group justify="space-between" py="md" px="xl">
        <Anchor href="https://rs.school/" target="_blank" size="xl">
          <Image
            src={logoRS}
            width={40}
            height={40}
            fit="contain"
            alt="rs-school"
          />
        </Anchor>
        <Stack gap="xs">
          <Text size="sm" fw={700} c="dimmed">
            GitHub
          </Text>
          <Anchor
            href="https://github.com/godlikeAlex"
            target="_blank"
            size="sm"
            c="dimmed"
            underline="never"
          >
            Aleksandr Yurkovskiy
          </Anchor>
          <Anchor
            href="https://github.com/alexanderkalyupanov"
            target="_blank"
            size="sm"
            c="dimmed"
            underline="never"
          >
            Alexander Kalyupanov
          </Anchor>

          <Anchor
            href="https://github.com/kateNEO"
            target="_blank"
            size="sm"
            c="dimmed"
            underline="never"
          >
            Ekaterina Naumenko
          </Anchor>
        </Stack>
        <Text size="sm" c="dimmed">
          © 2025 Rest Client
        </Text>
      </Group>
    </>
  );
}
