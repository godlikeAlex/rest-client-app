import type { HeaderClient } from '@/types/headers';
import { HTTPSnippet } from 'httpsnippet';

const options = { indent: '\u0020\u0020' };

const codeSnippetsMap = {
  curl: (snippet: HTTPSnippet) => snippet.convert('shell', 'curl', options),
  javascriptFetch: (snippet: HTTPSnippet) =>
    snippet.convert('javascript', 'fetch', options),
  javascriptXHR: (snippet: HTTPSnippet) =>
    snippet.convert('javascript', 'xhr', options),
  nodejs: (snippet: HTTPSnippet) => snippet.convert('node', undefined, options),
  python: (snippet: HTTPSnippet) =>
    snippet.convert('python', undefined, options),
  java: (snippet: HTTPSnippet) => snippet.convert('java', undefined, options),
  csharp: (snippet: HTTPSnippet) =>
    snippet.convert('csharp', undefined, options),
  go: (snippet: HTTPSnippet) => snippet.convert('go', undefined, options),
  php: (snippet: HTTPSnippet) => snippet.convert('php', undefined, options),
} as const;

export type SnippetGeneratorKey = keyof typeof codeSnippetsMap;

type GenerateCodeSnippetOptions = {
  method: string;
  url: string;
  headers: HeaderClient[];
  body: string;
};

export default class CodeGeneratorService {
  static generateCodeSnippet(
    language: SnippetGeneratorKey,
    { method, url, headers: requestHeaders, body }: GenerateCodeSnippetOptions
  ) {
    const headers = requestHeaders
      .filter((header) => header.enabled)
      .map((header) => ({ name: header.key, value: header.value }));

    try {
      const snippet = new HTTPSnippet({
        method: method,
        url: url,
        postData: {
          mimeType: 'application/json',
          text: body,
        },
        headers,
      });

      const snippetGenerator = codeSnippetsMap[language];

      return snippetGenerator(snippet);
    } catch {
      return false;
    }
  }
}
