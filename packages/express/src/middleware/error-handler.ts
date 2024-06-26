import { isNil } from '@hemjs/notions';
import { ErrorStatus, STATUS_CODE, StatusCode } from '@notchjs/http';
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
    if (isNil(status) || !this.isErrorStatus(status)) {
      status = 500;
    }
    return status;
  }

  private isErrorStatus(status: number): status is ErrorStatus {
    return this.isStatus(status) && status >= 400 && status < 600;
  }

  private isStatus(status: number): status is StatusCode {
    return Object.values(STATUS_CODE).includes(status as StatusCode);
  }
}
