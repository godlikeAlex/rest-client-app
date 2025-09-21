import { useLoaderData } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import HistoryPage from '../HistoryPage';
import { MantineProvider } from '@mantine/core';
import { renderWithProviders } from '@/tests/utils';

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('historyPage component', () => {
  it('should render FeedbackSection if history.length === 0', () => {
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      history: [],
    });

    expect.hasAssertions();

    renderWithProviders(<HistoryPage />);

    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });

  it('render sortedRequests in Accordion', () => {
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      history: [
        {
          id: '1',
          url: 'https://req1.com',
          method: 'GET',
          duration: 100,
          time: Date.now(),
          status: 200,
          error: null,
          requestSize: 1,
          responseSize: 1,
          requestData: { headers: [], body: '', queryParams: {} },
        },
        {
          id: '2',
          url: 'https://req2.com',
          method: 'GET',
          duration: 300,
          time: Date.now(),
          status: 200,
          error: null,
          requestSize: 1,
          responseSize: 1,
          requestData: { headers: [], body: '', queryParams: {} },
        },
        {
          id: '3',
          url: 'https://req3.com',
          method: 'GET',
          duration: 200,
          time: Date.now(),
          status: 200,
          error: null,
          requestSize: 1,
          responseSize: 1,
          requestData: { headers: [], body: '', queryParams: {} },
        },
      ],
    });

    renderWithProviders(
      <MantineProvider>
        <HistoryPage />
      </MantineProvider>
    );

    const renderedUrls = screen
      .getAllByRole('button')
      .map((el) => el.textContent);

    expect(renderedUrls[0]).toContain('req2.com');
    expect(renderedUrls[1]).toContain('req3.com');
    expect(renderedUrls[2]).toContain('req1.com');
  });
});
