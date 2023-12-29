import type { NotchHandler } from '@armscye/handler';
import type { NotchMiddleware } from '@armscye/middleware';

export class NotchHandlerMiddleware implements NotchMiddleware {
  constructor(private readonly handler: NotchHandler) {}

  public process(req: any, res: any, next: any) {
    return this.handler.handle(req, res, next);
  }
}
