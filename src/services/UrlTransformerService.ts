import type { HeaderClient } from '@/types/headers';

interface RequestPayload {
  method: string;
  url: string;
  body: string;
  headers: HeaderClient[];
}

interface DecodeRequestPayload
  extends Partial<Omit<RequestPayload, 'method' | 'headers'>> {
  headers: URLSearchParams;
}

interface DecodeResponse {
  url: string;
  body?: string;
  headers: HeaderClient[];
}

export default class UrlTransformerService {
  static encode({ headers, method, body, url }: RequestPayload): string {
    const searchParamsHeaders = new URLSearchParams();
    const enabledHeaders = headers.filter(
      (header) =>
        header.enabled && header.key.length > 0 && header.value.length > 0
    );
    const encodedBody = btoa(body);
    const encodedUrl = btoa(url);

    let generatedUrl: string = method;

    for (const header of enabledHeaders) {
      searchParamsHeaders.append(header.key, header.value);
    }

    if (url) generatedUrl += `/${encodedUrl}`;
    if (body) generatedUrl += `/${encodedBody}`;

    return `${generatedUrl}?${searchParamsHeaders.toString()}`;
  }

  static decode({ url, body, headers }: DecodeRequestPayload): DecodeResponse {
    const decodedUrl = url && atob(url);
    const decodedBody = body && atob(body);
    const clientHeaders: HeaderClient[] = [];

    for (const [key, value] of headers.entries()) {
      clientHeaders.push({ key, value, enabled: true });
    }

    return {
      url: decodedUrl ?? '',
      body: decodedBody,
      headers: clientHeaders,
    };
  }
}
