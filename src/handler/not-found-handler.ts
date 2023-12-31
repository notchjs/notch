import type { NotchHandler } from '@armscye/handler';

export class NotFoundHandler implements NotchHandler {
  handle(req: any, res: any, next?: any) {
    res.status(404).send(`Cannot ${req.method} ${req.url}`);
  }
}
