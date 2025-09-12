import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

interface RequestSuccess {
  error: false;
  status: number;
  time: number;
  data: string;
  requestSize: number;
  responseSize: number;
  requestTimestamp: string;
  contentType: 'json' | 'html';
}

interface RequestError {
  error: true;
  message: string;
  requestTimestamp: string;
}

export type RequestResult = RequestSuccess | RequestError;

export default class RequestService {
  static async sendRequest(
    url: string,
    method: string = 'GET',
    body?: string
  ): Promise<RequestResult> {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const start = Date.now();
    const requestTimestamp = new Date().toISOString();

    try {
      const response = await fetch(url, { ...options });
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

      return {
        error: false,
        status: response.status,
        time: timeTaken,
        requestSize,
        responseSize,
        requestTimestamp,
        data: (await this.beautifyData(contentType, data)) ?? '',
        contentType: contentType.includes('application/json') ? 'json' : 'html',
      };
    } catch (err: unknown) {
      console.log(err);
      const errorMessage = err instanceof Error ? err.message : 'Error';

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
}
