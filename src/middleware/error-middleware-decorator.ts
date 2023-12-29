import type { NotchMiddleware } from '@armscye/middleware';

export class ErrorMiddlewareDecorator implements NotchMiddleware {
  constructor(private readonly callable: Function) {}

  public process(err: any, req: any, res: any, next?: any) {
    return this.callable(err, req, res, next);
  }
}
