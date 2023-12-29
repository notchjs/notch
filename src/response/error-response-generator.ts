import type { ResponseGenerator } from '@armscye/response';
import { isNil, isObject } from '@hemjs/notions';

export class ErrorResponseGenerator implements ResponseGenerator {
  reply(response: any, body: any, statusCode?: number) {
    if (statusCode) {
      response.status(statusCode);
    }
    if (isNil(body)) {
      return response.send();
    }
    return isObject(body) ? response.json(body) : response.send(String(body));
  }
}
