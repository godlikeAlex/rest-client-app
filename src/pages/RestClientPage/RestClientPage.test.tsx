import { renderWithProviders, screen } from '@/tests/utils';
import RestClientPage from './RestClientPage';
import { describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import RestContextProvider, {
  type RestClientState,
} from './context/RestContext';

vi.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    user: {
      uid: '123',
      variables: [{ key: 'example', value: '123', enabled: true }],
    },
  }),
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

const createRouter = () =>
  createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <RestContextProvider
            initialState={{
              ...mockData,
            }}
          >
            <RestClientPage />
          </RestContextProvider>
        ),
      },
    ],
    {
      initialEntries: ['/'],
    }
  );

describe('rest client page', () => {
  it('should render content', () => {
    expect.hasAssertions();

    renderWithProviders(<RouterProvider router={createRouter()} />);

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Code Generation')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });
});
