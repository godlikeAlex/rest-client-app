import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import Loader from './Loader';

describe('component Loader', () => {
  it('should show loader when visible equals true', () => {
    expect.hasAssertions();

    renderWithProviders(<Loader visible />);

    expect(
      screen.getByText('We are processing your request')
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
