import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import i18n from '@/app/i18n';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Backend from 'i18next-fetch-backend';

const instanceI18N = createInstance();
await instanceI18N
  .use(Backend)
  .use(initReactI18next)
  .init({
    ...i18n,
  });

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <I18nextProvider i18n={instanceI18N}>
        <MantineProvider>{children}</MantineProvider>
      </I18nextProvider>
    ),
  });
};
