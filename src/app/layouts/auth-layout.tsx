import { Box, Flex } from '@mantine/core';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <Flex justify="center" align="center" mih="70vh" py="sm" px="sm">
      <Box maw="100%" w={450}>
        <Outlet />
      </Box>
    </Flex>
  );
}
