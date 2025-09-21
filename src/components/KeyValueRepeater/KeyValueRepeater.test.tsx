import { describe, expect, it, vi } from 'vitest';
import RestContextProvider, {
  type RestClientState,
} from '@/pages/RestClientPage/context/RestContext';
import KeyValueRepeater from './KeyValueRepeater';
import { act, renderHook, screen } from '@testing-library/react';
import { renderWithProviders, userEvent } from '@/tests/utils';
import useKeyValueRepeater, { type KeyValueItem } from './useKeyValueRepeater';

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

const mockUseKeyValueRepeater = (rows = mockData.headers) => ({
  rows,
  deleteRow: vi.fn<(position: number) => void>(),
  addRow: vi.fn(),
  updateRow:
    vi.fn<
      (
        rowPosition: number,
        input: keyof KeyValueItem,
        value: KeyValueItem[keyof KeyValueItem]
      ) => void
    >(),
});

describe('component HeaderRepeater', () => {
  it('should render correct number of inputs', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <KeyValueRepeater {...mockUseKeyValueRepeater()} />
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
        <KeyValueRepeater {...mockUseKeyValueRepeater()} />
      </RestContextProvider>
    );

    for (const header of mockData.headers) {
      expect(screen.getByDisplayValue(header.key)).toBeInTheDocument();
      expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
    }
  });

  it('should call onDelete with correct headerPosition when delete button is clicked', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const positionHeader = 1;
    const itemToDelete = mockData.headers[positionHeader].key;

    const mockHook = mockUseKeyValueRepeater();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <KeyValueRepeater {...mockHook} />
      </RestContextProvider>
    );

    await user.click(
      screen.getByRole('button', { name: `Delete ${itemToDelete}` })
    );

    expect(mockHook.deleteRow).toHaveBeenCalledWith(positionHeader);
  });

  it('should call addHeader on click button add header', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    const mockHook = mockUseKeyValueRepeater();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <KeyValueRepeater {...mockHook} />
      </RestContextProvider>
    );

    await user.click(screen.getByRole('button', { name: /add header/i }));

    expect(mockHook.addRow).toHaveBeenCalledWith();
  });

  it('should update value input on user input', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const newInputValue = 'Wow Header Value';

    const mockHook = mockUseKeyValueRepeater([
      { key: '', value: '', enabled: true },
    ]);

    renderWithProviders(
      <RestContextProvider
        initialState={{
          ...mockData,
          headers: [{ key: '', value: '', enabled: true }],
        }}
      >
        <KeyValueRepeater {...mockHook} />
      </RestContextProvider>
    );

    await user.type(screen.getByPlaceholderText('Value'), newInputValue);

    expect(mockHook.updateRow).toHaveBeenCalledTimes(newInputValue.length);
  });

  it('should disable header on click enabled checkbox', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    const targetHeader = mockData.headers[0].key;

    const mockHook = mockUseKeyValueRepeater();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <KeyValueRepeater {...mockHook} />
      </RestContextProvider>
    );

    await user.click(screen.getByLabelText(`Enable ${targetHeader}`));

    expect(mockHook.updateRow).toHaveBeenCalledWith(0, 'enabled', false);
  });
});

describe('useKeyValueRepeater component', () => {
  it('should return correct values', () => {
    expect.hasAssertions();

    const setState = vi.fn();

    const { result } = renderHook(() =>
      useKeyValueRepeater({ state: [], onStateChange: setState })
    );

    expect(result.current.rows).toBeDefined();
    expect(result.current.deleteRow).toBeDefined();
    expect(result.current.updateRow).toBeDefined();
    expect(result.current.addRow).toBeDefined();
  });

  it('should return empty row on addRow', async () => {
    expect.hasAssertions();

    const setState = vi.fn();

    const { result } = await renderHook(() =>
      useKeyValueRepeater({ state: [], onStateChange: setState })
    );

    await act(() => {
      result.current.addRow();
    });

    expect(setState).toHaveBeenCalled();
  });
});
