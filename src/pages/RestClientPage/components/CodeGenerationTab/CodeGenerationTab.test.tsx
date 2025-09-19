import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/tests/utils';
import RestContextProvider, {
  type RestClientState,
} from '../../context/RestContext';
import CodeGenerationTab from './CodeGenerationTab';
import { createMemoryRouter, RouterProvider } from 'react-router';

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

const router = createMemoryRouter(
  [
    {
      id: 'root',
      path: '/',
      element: (
        <RestContextProvider
          initialState={{
            ...mockData,
            url: 'http://localhost:80',
          }}
        >
          <CodeGenerationTab />
        </RestContextProvider>
      ),
      loader: () => ({
        user: {
          variables: [
            { key: 'base_url', value: 'http://localhost:80', enabled: true },
          ],
        },
      }),
    },
  ],
  {
    initialEntries: ['/'],
  }
);

describe('component CodeGenerationTab', () => {
  // it('should show error alert if there is enough data to generate', () => {
  //   expect.hasAssertions();
  //
  //   renderWithProviders(
  //     <RouterProvider router={router} />
  //   );
  //   expect(screen.getByRole('alert')).toBeInTheDocument();
  // });

  it('should show code if there is enough data to generate', () => {
    expect.hasAssertions();

    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should change language on select another language for generation', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    renderWithProviders(<RouterProvider router={router} />);

    await user.click(screen.getByPlaceholderText('language'));
    await user.click(screen.getByText('php'));

    expect(
      screen.getByText(/\$response = curl_exec\(\$curl\);/i)
    ).toBeInTheDocument();
  });
});
