import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/tests/utils';
import RestContextProvider, {
  type RestClientState,
} from '../../context/RestContext';
import CodeGenerationTab from './CodeGenerationTab';

vi.mock('@codemirror/lang-json', () => ({
  json: () => () => {},
}));

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

describe('component CodeGenerationTab', () => {
  it('should show error alert if there is enough data to generate', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider initialState={mockData}>
        <CodeGenerationTab />
      </RestContextProvider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should show code if there is enough data to generate', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider
        initialState={{ ...mockData, url: 'http://localhost:80' }}
      >
        <CodeGenerationTab />
      </RestContextProvider>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should change language on select another language for generation', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();

    renderWithProviders(
      <RestContextProvider
        initialState={{ ...mockData, url: 'http://localhost:80' }}
      >
        <CodeGenerationTab />
      </RestContextProvider>
    );

    await user.click(screen.getByPlaceholderText('language'));
    await user.click(screen.getByText('php'));

    expect(
      screen.getByText(/\$response = curl_exec\(\$curl\);/i)
    ).toBeInTheDocument();
  });
});
