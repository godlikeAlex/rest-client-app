import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>{children}</MantineProvider>
    ),
  });
};
