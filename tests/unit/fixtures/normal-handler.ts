import type { NotchHandler } from '@armscye/handler';

export class NormalHandler implements NotchHandler {
  handle(req: any, res: any) {
    return 'foo';
  }
}
