import type { NotchHandler } from '@notchjs/types';

export class NormalHandler implements NotchHandler {
  handle(req: any, res: any) {
    return 'foo';
  }
}
