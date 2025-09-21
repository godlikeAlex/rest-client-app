import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/tests/utils';
import RestContextProvider, {
  type RestClientState,
} from '../../context/RestContext';
import CodeGenerationTab from './CodeGenerationTab';
import { createMemoryRouter, RouterProvider } from 'react-router';

vi.mock('@/components/CodeEditor/languages');

vi.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    user: {
      uid: '123',
      variables: [{ key: 'example', value: '123', enabled: true }],
    },
  }),
}));

vi.mock('@codemirror/lang-json', () => ({
  json: () => () => {},
}));

vi.mock('@codemirror/lang-json', () => ({
  json: () => () => {},
}));

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

const createRouter = (propsData?: Partial<RestClientState>) => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <RestContextProvider
            initialState={{
              ...mockData,
              ...propsData,
            }}
          >
            <CodeGenerationTab />
          </RestContextProvider>
        ),
      },
    ],
    {
      initialEntries: ['/'],
    }
  );
};

describe('component CodeGenerationTab', () => {
  it('should show error alert if there is enough data to generate', () => {
    expect.hasAssertions();

    const router = createRouter();

    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should show code if there is enough data to generate', () => {
    expect.hasAssertions();

    const router = createRouter({ url: 'localhost:8000' });

    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should change language on select another language for generation', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const router = createRouter({ url: 'http://localhost:80' });

    renderWithProviders(<RouterProvider router={router} />);

    await user.click(screen.getByPlaceholderText('language'));
    await user.click(screen.getByText('php'));

    expect(
      screen.getByText(/\$response = curl_exec\(\$curl\);/i)
    ).toBeInTheDocument();
  });
});
