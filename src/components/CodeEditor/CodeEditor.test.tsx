import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import CodeEditor from './CodeEditor';

const mockOnChange = vi.fn<(value: string) => void>();

describe('component CodeEditor', () => {
  it('should render correct value', () => {
    expect.hasAssertions();

    const exampleValue = 'example';

    render(<CodeEditor value={exampleValue} onChange={mockOnChange} />);

    expect(screen.getByText(exampleValue)).toBeInTheDocument();
  });

  it('should call onchange handler on user type', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const userInput = 'example';

    render(<CodeEditor value={''} onChange={mockOnChange} />);

    await user.type(screen.getByRole('textbox'), userInput);

    expect(mockOnChange).toHaveBeenCalledTimes(userInput.length);
  });
});
