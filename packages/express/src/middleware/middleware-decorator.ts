import type { NotchMiddleware } from '@notchjs/types';

export class MiddlewareDecorator implements NotchMiddleware {
  private readonly callable: (...args: any[]) => any;

  constructor(callable: (...args: any[]) => any) {
    this.callable = callable;
  }

  public process(req: any, res: any, next: any) {
    return this.callable(req, res, next);
  }
}
