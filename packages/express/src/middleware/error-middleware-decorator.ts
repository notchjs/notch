import type { NotchMiddleware } from '@notchjs/types';

export class ErrorMiddlewareDecorator implements NotchMiddleware {
  private readonly callable: (...args: any[]) => any;

  constructor(callable: (...args: any[]) => any) {
    this.callable = callable;
  }

  public process(err: any, req: any, res: any, next?: any) {
    return this.callable(err, req, res, next);
  }
}
