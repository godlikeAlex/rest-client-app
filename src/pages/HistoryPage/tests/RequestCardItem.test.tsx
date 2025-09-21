import { describe, expect, it } from 'vitest';
import RequestCardItem from '../components/RequestCardItem/RequestCardItem';
import type { RequestData } from '@/services/HistoryService';
import { MemoryRouter } from 'react-router';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/tests/utils';
import { Accordion } from '@mantine/core';

describe('requestCardItem component', () => {
  const mockRequest: RequestData = {
    id: '1',
    url: 'https://example.com/api',
    method: 'GET',
    duration: 123,
    time: Date.now(),
    status: 200,
    error: null,
    requestSize: 50,
    responseSize: 100,
    timestamp: '12.05.2025',
    requestData: {
      headers: [{ key: 'Authorization', value: 'Bearer token', enabled: true }],
      body: '{"foo":"bar"}',
      queryParams: { q: 'test' },
    },
  };

  const mockRequestError: RequestData = {
    id: '1',
    url: 'https://example.com/api',
    method: 'GET',
    duration: 123,
    time: Date.now(),
    timestamp: '12.05.2025',
    status: 400,
    error: 'Invalid token',
    requestSize: 50,
    responseSize: 100,
    requestData: {
      headers: [{ key: 'Authorization', value: 'Bearer token', enabled: true }],
      body: '{"foo":"bar"}',
      queryParams: { q: 'test' },
    },
  };

  const language = 'en';

  it('render RequestCardItem component', () => {
    renderWithProviders(
      <MemoryRouter>
        <Accordion>
          <RequestCardItem language={language} request={mockRequest} />
        </Accordion>
      </MemoryRouter>
    );

    expect(screen.getByText(mockRequest.url)).toBeInTheDocument();
  });

  it('should error message', () => {
    renderWithProviders(
      <MemoryRouter>
        <Accordion>
          <RequestCardItem language={language} request={mockRequestError} />
        </Accordion>
      </MemoryRouter>
    );

    expect(
      screen.getByText(`Error: ${mockRequestError.error}` as string)
    ).toBeInTheDocument();
  });
});
