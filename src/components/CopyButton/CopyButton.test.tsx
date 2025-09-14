import { fireEvent, renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it, vi } from 'vitest';
import CopyButton from './CopyButton';

describe('component copy button', () => {
  it('should copy passed value', async () => {
    expect.hasAssertions();

    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText,
      },
    });

    const copyValue = 'Hello world';

    renderWithProviders(<CopyButton content={copyValue} />);

    fireEvent.click(screen.getByRole('button'));

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      copyValue
    );
  });
});
