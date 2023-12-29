import type { NotchMiddleware } from '@armscye/middleware';

export class NormalMiddleware implements NotchMiddleware {
  process(req: any, res: any, next: (error?: any) => void) {
    return 'foo';
  }
}
