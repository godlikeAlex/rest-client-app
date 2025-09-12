import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import FeedbackSection from './FeedbackSection';

describe('component WaitingResponseSection', () => {
  it('should render with image and title', () => {
    expect.hasAssertions();

    const title = 'Example Title';
    const description = 'Description';

    renderWithProviders(
      <FeedbackSection title={title} description={description} status="idle" />
    );

    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: title })).toBeInTheDocument();
  });

  it('should render with passed title and description', () => {
    expect.hasAssertions();

    const title = 'Example Title';
    const description = 'Description';

    renderWithProviders(
      <FeedbackSection title={title} description={description} status="idle" />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
