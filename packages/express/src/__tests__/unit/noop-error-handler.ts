import type { NotchMiddleware } from '@notchjs/types';

export class NoopErrorHandler implements NotchMiddleware {
  process(err: any, req: any, res: any, next?: any) {}
}
