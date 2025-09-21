import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import type { HeaderClient } from '@/types/headers';

type ResponseHeader = { key: string; value: string };

export interface RequestBase {
  status: number;
  time: number;
  requestSize: number;
  responseSize: number;
}
interface RequestSuccess extends RequestBase {
  error: false;
  data: string;
  headers: ResponseHeader[];
  requestTimestamp: string;
  contentType: 'json' | 'html';
}

export interface RequestError {
  error: true;
  message: string;
  requestTimestamp: string;
}

interface SendRequestParams {
  url: string;
  method: string;
  body?: string;
  clientHeaders: HeaderClient[];
}

export type RequestResult = RequestSuccess | RequestError;

export default class RequestService {
  static async sendRequest({
    method = 'GET',
    body,
    url,
    clientHeaders,
  }: SendRequestParams): Promise<RequestResult> {
    const headers = clientHeaders
      .filter((header) => header.enabled)
      .reduce<Record<string, string>>((headers, { key, value }) => {
        headers[key] = value;

        return headers;
      }, {});

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(this.tryParseBody(body)) : undefined,
    };

    const start = Date.now();
    const requestTimestamp = new Date().toISOString();

    try {
      const response = await fetch(url, options);
      const end = Date.now();
      const timeTaken = end - start;

      const requestSize = Buffer.byteLength(body ?? '', 'utf8');
      const responseSize = (await response.clone().arrayBuffer()).byteLength;

      const contentType = response.headers.get('content-type') || '';

      let data: string;

      if (contentType.includes('application/json')) {
        data = await response.clone().json();
      } else {
        data = await response.text();
      }

      const responseHeadersArray: ResponseHeader[] = [];

      response.headers.forEach((value, key) => {
        responseHeadersArray.push({ key, value });
      });

      return {
        error: false,
        status: response.status,
        time: timeTaken,
        requestSize,
        responseSize,
        requestTimestamp,
        data: (await this.beautifyData(contentType, data)) ?? '',
        headers: responseHeadersArray,
        contentType: contentType.includes('application/json') ? 'json' : 'html',
      };
    } catch (err: unknown) {
      let errorMessage = 'Error';

      if (err instanceof Error) {
        errorMessage = err.message;

        if (err.cause !== undefined) {
          errorMessage = String(err.cause);
        }
      }
      return {
        error: true,
        message: errorMessage,
        requestTimestamp,
      };
    }
  }

  private static async beautifyData(contentTypeHeader: string, data: string) {
    if (contentTypeHeader.includes('application/json')) {
      return JSON.stringify(data, null, 2);
    } else if (contentTypeHeader.includes('text/html')) {
      return prettier.format(data, {
        parser: 'html',
        plugins: [parserHtml],
      });
    }
  }

  private static tryParseBody(body: string): Record<string, unknown> | string {
    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }
}
