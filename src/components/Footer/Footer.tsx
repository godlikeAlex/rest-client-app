import { Group, Text, Divider, Stack, Anchor, Image, Box } from '@mantine/core';
import logoRS from '@/assets/rs_school.svg';
import { IconBrandGithub } from '@tabler/icons-react';

export default function Footer() {
  return (
    <Box component="footer">
      <Divider />
      <Group justify="space-between" py="md" px="xl">
        <Stack gap="xs">
          <Text size="sm" fw={700} c="dimmed">
            <IconBrandGithub size={16} />
            Contributors:
          </Text>
          <Group>
            <Anchor
              href="https://github.com/godlikeAlex"
              target="_blank"
              size="sm"
              c="dimmed"
            >
              Aleksandr Yurkovskiy
            </Anchor>
            <Anchor
              href="https://github.com/alexanderkalyupanov"
              target="_blank"
              size="sm"
              c="dimmed"
            >
              Alexander Kalyupanov
            </Anchor>

            <Anchor
              href="https://github.com/kateNEO"
              target="_blank"
              size="sm"
              c="dimmed"
            >
              Ekaterina Naumenko
            </Anchor>
          </Group>
        </Stack>

        <Anchor
          href="https://rs.school/"
          target="_blank"
          size="xl"
          underline="never"
        >
          <Image src={logoRS} w={125} alt="rs-school" />
          <Text size="sm" c="dimmed" mt={'xs'}>
            © 2025 Rest Client
          </Text>
        </Anchor>
      </Group>
    </Box>
  );
}
