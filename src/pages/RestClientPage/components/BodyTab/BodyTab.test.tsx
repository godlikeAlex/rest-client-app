import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import BodyTab from './BodyTab';
import RestContextProvider, {
  type RestClientState,
} from '../../context/RestContext';

const mockData: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [
    { enabled: true, key: 'Example Title', value: 'Example Value' },
    { enabled: true, key: 'Example Title2', value: 'Example Value2' },
  ],
};

describe('body Tab', () => {
  it('should render radio buttons prettify button', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RestContextProvider
        initialState={{
          ...mockData,
        }}
      >
        <BodyTab />
      </RestContextProvider>
    );

    expect(screen.getByText('Json')).toBeInTheDocument();
    expect(screen.getByText('Plain text')).toBeInTheDocument();
    expect(screen.getByText('Prettify')).toBeInTheDocument();
  });
});
