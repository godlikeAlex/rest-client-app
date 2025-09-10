import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import WaitingResponseSection from './WaitingResponseSection';

describe('component WaitingResponseSection', () => {
  it('should render with image and title', () => {
    expect.hasAssertions();

    renderWithProviders(<WaitingResponseSection />);

    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Waiting your response' })
    ).toBeInTheDocument();
  });
});
