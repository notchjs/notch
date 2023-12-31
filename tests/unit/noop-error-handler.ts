import type { NotchMiddleware } from '@armscye/middleware';

export class NoopErrorHandler implements NotchMiddleware {
  process(err: any, req: any, res: any, next?: any) {}
}
