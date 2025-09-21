import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from './Footer';
import { renderWithProviders } from '@/tests/utils';

describe('footer component', () => {
  it('should render logo, contributors and copyright text', () => {
    expect.hasAssertions();

    renderWithProviders(<Footer />);

    const rsLogo = screen.getByAltText('rs-school');

    expect(rsLogo).toBeInTheDocument();

    const contributors = [
      'Aleksandr Yurkovskiy',
      'Alexander Kalyupanov',
      'Ekaterina Naumenko',
    ];

    contributors.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    expect(screen.getByText('© 2025 Rest Client')).toBeInTheDocument();
  });
});
