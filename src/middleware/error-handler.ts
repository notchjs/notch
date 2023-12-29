import type { NotchMiddleware } from '@armscye/middleware';
import type { ResponseGenerator } from '@armscye/response';
import { isNil } from '@hemjs/notions';

import type { StatusCode } from '../types';

export class ErrorHandler implements NotchMiddleware {
  constructor(private readonly generator: ResponseGenerator) {}

  public process(err: Error | any, req: any, res: any, next?: any) {
    const statusCode = this.getStatusCode(err);
    const body = {
      statusCode: statusCode,
      message: err.message,
    };
    this.generator.reply(res, body, statusCode);
  }

  private getStatusCode(error: Error | any): number {
    let status = error.status || error.statusCode;
    if (isNil(status) || !this.isErrorStatus(status)) {
      status = 500;
    }
    return status;
  }

  private isErrorStatus(status: StatusCode): boolean {
    return status >= 400 && status < 600;
  }
}
