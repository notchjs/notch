import type { NotchHandler, NotchMiddleware } from '@notchjs/types';

export class NotchHandlerMiddleware implements NotchMiddleware {
  private readonly handler: NotchHandler;

  constructor(handler: NotchHandler) {
    this.handler = handler;
  }

  public process(req: any, res: any, next: any) {
    return this.handler.handle(req, res, next);
  }
}
