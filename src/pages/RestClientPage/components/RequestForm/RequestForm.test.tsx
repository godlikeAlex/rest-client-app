import { renderWithProviders, screen, userEvent } from '@/tests/utils';
import { describe, expect, it, vi } from 'vitest';
import RequestForm from './RequestForm';
import type { RestClientState } from '../../context/RestContext';
import RestContextProvider from '../../context/RestContext';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UrlTransformerService } from '@/services';

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

const createRouter = (props?: Partial<RestClientState>) =>
  createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <RestContextProvider initialState={{ ...mockData, ...props }}>
            <RequestForm />
          </RestContextProvider>
        ),
      },
    ],
    { initialEntries: ['/'] }
  );

describe('component request from', () => {
  it('should show error input on submit empty url', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const router = createRouter();

    renderWithProviders(<RouterProvider router={router} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByPlaceholderText('Enter URL')).toHaveAttribute(
      'data-error',
      'true'
    );
  });

  it('should store value url', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const newUrl = 'http:localhost:7777';

    const router = createRouter();

    renderWithProviders(<RouterProvider router={router} />);

    const input = screen.getByPlaceholderText('Enter URL');

    await user.type(input, newUrl);

    expect(input).not.toHaveAttribute('data-error');
    expect(input).toHaveValue(newUrl);
  });

  it('should submit correct value', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const url = 'http:localhost:7777';

    const spyEncode = vi.spyOn(UrlTransformerService, 'encode');

    const router = createRouter({ url });

    renderWithProviders(<RouterProvider router={router} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(spyEncode).toHaveBeenCalledWith({
      body: mockData.body,
      method: mockData.method,
      headers: mockData.headers,
      url,
    });
  });
});
