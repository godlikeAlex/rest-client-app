import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import HttpStatusBadge from './HttpStatusBadge';

describe('component HttpStatusBadge', () => {
  it('should render with passed status', () => {
    expect.hasAssertions();

    const status = 200;

    renderWithProviders(<HttpStatusBadge status={status} />);

    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it('should render with gray color if status not defined', () => {
    expect.hasAssertions();

    const status = 1232;

    renderWithProviders(<HttpStatusBadge status={status} />);

    expect(screen.getByTestId('badge')).toHaveStyle(
      '--badge-bg: var(--mantine-color-gray-light)'
    );
  });
});
