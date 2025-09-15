import { describe, expect, it } from 'vitest';
import CodeGeneratorService from '../CodeGeneratorService';
import type { HeaderClient } from '@/types/headers';

const headers: HeaderClient[] = [
  { enabled: false, key: 'header', value: 'headervalue' },
];

describe('code generation service', () => {
  it('should return HTTPSnippet from generateCodeSnippet', () => {
    expect.hasAssertions();

    const result = CodeGeneratorService.generateCodeSnippet('javascriptFetch', {
      method: 'GET',
      url: 'localhost:8000',
      headers,
      body: 'example body',
    });

    expect(result).includes('await fetch');
  });

  it('should return false from generateCodeSnippet when url wrong', () => {
    expect.hasAssertions();

    const result = CodeGeneratorService.generateCodeSnippet('javascriptFetch', {
      method: 'GET',
      url: 'loca',
      headers,
      body: 'example body',
    });

    expect(result).toBe(false);
  });
});
