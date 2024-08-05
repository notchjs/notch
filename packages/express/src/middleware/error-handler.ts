import { isNil } from '@hemjs/notions';
import { isErrorStatus } from '@notchjs/http';
import type { NotchMiddleware, ResponseGenerator } from '@notchjs/types';

export class ErrorHandler implements NotchMiddleware {
  private readonly responseGenerator: ResponseGenerator | undefined;

  constructor(responseGenerator?: ResponseGenerator) {
    this.responseGenerator = responseGenerator;
  }

  public process(err: Error | any, req: any, res: any, next?: any) {
    const statusCode = this.getStatusCode(err);
    const body = {
      statusCode: statusCode,
      message: err.message,
    };
    this.responseGenerator?.reply(res, body, statusCode);
  }

  private getStatusCode(error: Error | any): number {
    let status = error.status || error.statusCode;
    if (isNil(status) || !isErrorStatus(status)) {
      status = 500;
    }
    return status;
  }
}
