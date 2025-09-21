import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it, vi } from 'vitest';
import VariablesPage from './VariablesPage';

vi.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    user: {
      uid: '123',
      variables: [{ key: 'example', value: '123', enabled: true }],
    },
  }),
}));

describe('page variables', () => {
  it('should render page', () => {
    expect.hasAssertions();

    renderWithProviders(<VariablesPage />);

    expect(screen.getByText('Variables in request:')).toBeInTheDocument();
  });
});
