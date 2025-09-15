import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import ResponseSection from '../ResponseSection';
import type { RequestResult } from '@/services/RequestService';

describe('component Response section', () => {
  it('should render error when error passed', () => {
    expect.hasAssertions();

    const mockRequestErrorData: RequestResult = {
      error: true,
      message: 'Whoops',
      requestTimestamp: '123',
    };

    renderWithProviders(
      <ResponseSection requestResult={mockRequestErrorData} />
    );

    expect(screen.getByText(mockRequestErrorData.message)).toBeInTheDocument();
  });

  it('should render response data', () => {
    expect.hasAssertions();

    const mockRequestErrorData: RequestResult = {
      error: false,
      status: 202,
      time: 789,
      data: 'example json',
      headers: [],
      requestSize: 600,
      responseSize: 1500,
      requestTimestamp: '12.01.2025',
      contentType: 'json',
    };

    renderWithProviders(
      <ResponseSection requestResult={mockRequestErrorData} />
    );

    expect(screen.getByText(mockRequestErrorData.status)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRequestErrorData.time}ms`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockRequestErrorData.data)).toBeInTheDocument();
  });
});
