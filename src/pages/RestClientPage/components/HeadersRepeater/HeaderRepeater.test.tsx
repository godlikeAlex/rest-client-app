import { describe, expect, it, vi } from 'vitest';
import RestContextProvider, {
  type RestClientState,
} from '@/pages/RestClientPage/context/RestContext';
import HeadersRepeater from './HeadersRepeater';
import { screen } from '@testing-library/react';
import { renderWithProviders, userEvent } from '@/tests/utils';

import * as useHeaders from '@/pages/RestClientPage/hooks/useHeaders';

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

describe('component HeaderRepeater', () => {
  it('should render correct number of inputs', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <HeadersRepeater />
      </RestContextProvider>
    );

    expect(screen.getAllByPlaceholderText('Key')).toHaveLength(
      mockData.headers.length
    );
    expect(screen.getAllByPlaceholderText('Value')).toHaveLength(
      mockData.headers.length
    );
  });

  it('should render correct values in inputs', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <HeadersRepeater />
      </RestContextProvider>
    );

    for (const header of mockData.headers) {
      expect(screen.getByDisplayValue(header.key)).toBeInTheDocument();
      expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
    }
  });

  it('should call onDelete with correct headerPosition when delete button is clicked', async () => {
    expect.hasAssertions();

    const deleteHeaderMock = vi.fn<(position: number) => void>();

    vi.spyOn(useHeaders, 'default').mockReturnValue({
      headers: mockData.headers,
      deleteHeader: deleteHeaderMock,
      addHeader: vi.fn(),
      updateHeader: vi.fn(),
    });

    const user = userEvent.setup();

    const positionHeader = 1;
    const itemToDelete = mockData.headers[positionHeader].key;

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <HeadersRepeater />
      </RestContextProvider>
    );

    await user.click(
      screen.getByRole('button', { name: `Delete ${itemToDelete}` })
    );

    expect(deleteHeaderMock).toHaveBeenCalledWith(positionHeader);
  });

  it('should call addHeader on click button add header', async () => {
    expect.hasAssertions();

    const addHeaderMock = vi.fn<() => void>();

    vi.spyOn(useHeaders, 'default').mockReturnValue({
      headers: mockData.headers,
      deleteHeader: vi.fn(),
      addHeader: addHeaderMock,
      updateHeader: vi.fn(),
    });

    const user = userEvent.setup();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <HeadersRepeater />
      </RestContextProvider>
    );

    await user.click(screen.getByRole('button', { name: /add header/i }));

    expect(addHeaderMock).toHaveBeenCalledWith();
  });

  it('should update key input on user input', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const newInputKey = 'Wow Header';

    renderWithProviders(
      <RestContextProvider
        initialState={{
          ...mockData,
          headers: [{ key: '', value: '', enabled: true }],
        }}
      >
        <HeadersRepeater />
      </RestContextProvider>
    );

    await user.type(screen.getByPlaceholderText('Key'), newInputKey);

    expect(screen.getByDisplayValue(newInputKey)).toBeInTheDocument();
  });

  it('should update value input on user input', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const newInputValue = 'Wow Header Value';

    renderWithProviders(
      <RestContextProvider
        initialState={{
          ...mockData,
          headers: [{ key: '', value: '', enabled: true }],
        }}
      >
        <HeadersRepeater />
      </RestContextProvider>
    );

    await user.type(screen.getByPlaceholderText('Value'), newInputValue);

    expect(screen.getByDisplayValue(newInputValue)).toBeInTheDocument();
  });

  it('should disable header on click enabled checkbox', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const targetHeader = mockData.headers[0].key;

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <HeadersRepeater />
      </RestContextProvider>
    );

    await user.click(screen.getByLabelText(`Enable ${targetHeader}`));

    expect(screen.getByLabelText(`Enable ${targetHeader}`)).not.toBeChecked();
  });
});
