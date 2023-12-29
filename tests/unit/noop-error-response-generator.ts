import type { ResponseGenerator } from '@armscye/response';

export class NoopErrorResponseGenerator implements ResponseGenerator {
  reply(response: any, body: any, statusCode?: number | undefined) {}
}
