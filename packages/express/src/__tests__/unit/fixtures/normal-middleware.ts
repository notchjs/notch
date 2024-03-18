import type { NotchMiddleware } from '@notchjs/types';

export class NormalMiddleware implements NotchMiddleware {
  process(req: any, res: any, next: (error?: any) => void) {
    return 'foo';
  }
}
