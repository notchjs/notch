import type { NotchMiddleware } from '@armscye/middleware';

export class MiddlewareDecorator implements NotchMiddleware {
  constructor(private readonly callable: Function) {}

  public process(req: any, res: any, next: any) {
    return this.callable(req, res, next);
  }
}
