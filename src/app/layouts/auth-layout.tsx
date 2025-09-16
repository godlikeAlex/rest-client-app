import { Box, Flex } from '@mantine/core';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <Flex justify="center" align="center" mih="75vh" py="xl" px="md">
      <Box maw="100%" w={450}>
        <Outlet />
      </Box>
    </Flex>
  );
}
