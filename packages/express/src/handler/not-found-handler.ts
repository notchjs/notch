import { STATUS_CODE } from '@notchjs/http';
import type { NotchHandler } from '@notchjs/types';

export class NotFoundHandler implements NotchHandler {
  handle(req: any, res: any, next?: any) {
    res.status(STATUS_CODE.NotFound).send(`Cannot ${req.method} ${req.url}`);
  }
}
