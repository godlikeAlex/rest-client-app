import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import HeadersViewTable from '../HeadersViewTable';

describe('component HeadersViewTable', () => {
  it('should render correct headers', () => {
    expect.hasAssertions();

    const headers = [
      { key: 'example', value: 'valueexample' },
      { key: 'example2', value: 'examplevalue2' },
    ];

    renderWithProviders(<HeadersViewTable headers={headers} />);

    for (const header of headers) {
      expect(screen.getByText(header.key)).toBeInTheDocument();
      expect(screen.getByText(header.value)).toBeInTheDocument();
    }
  });
});
