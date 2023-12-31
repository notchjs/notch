import type { NotchMiddleware } from '@armscye/middleware';

export class ErrorHandlerHost {
  constructor(private readonly errorHandler: NotchMiddleware) {}

  getErrorHandler(): NotchMiddleware {
    return this.errorHandler;
  }
}
