import type { ResponseGenerator } from '@notchjs/types';

export class NoopErrorResponseGenerator implements ResponseGenerator {
  reply(response: any, body: any, statusCode?: number | undefined) {}
}
