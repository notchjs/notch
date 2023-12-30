import type { Type } from '@armscye/core';
import type { NotchHandler } from '@armscye/handler';
import type { NotchMiddleware } from '@armscye/middleware';
import { isFunction, isString, isSymbol, isUndefined } from '@hemjs/notions';

import {
  ErrorMiddlewareDecorator,
  MiddlewareDecorator,
  NotchHandlerMiddleware,
} from './middleware';
import type { MiddlewareContainer } from './middleware-container';
import { stringify } from './utils/stringify';

export class MiddlewareFactory {
  constructor(private readonly container: MiddlewareContainer) {}

  public prepare(middleware: any): NotchMiddleware | NotchMiddleware[] {
    if (Array.isArray(middleware)) {
      return this.pipeline(middleware);
    }

    if (middleware?.process) {
      return middleware;
    }

    if (middleware?.handle) {
      return this.handler(middleware);
    }

    if (this.isMiddlewareClass(middleware)) {
      const instance = new middleware();

      if (isFunction(instance.handle)) {
        return this.handler(instance);
      }

      if (isUndefined(instance.process)) {
        throw new Error(
          `Invalid middleware (${stringify(
            middleware,
          )}); does not provide 'process' or 'handle' method. `,
        );
      }

      return instance;
    }

    if (isFunction(middleware)) {
      return this.callable(middleware);
    }

    if (!isString(middleware) && !isSymbol(middleware)) {
      throw new Error(
        `Middleware (${stringify(
          middleware,
        )}) is expected to be of type string, symbol, class/object defining 'process' or 'handle' method, function, or array; received ${typeof middleware}.`,
      );
    }

    return this.lazy(middleware);
  }

  public callable(middleware: Function): NotchMiddleware {
    if (middleware.length > 3) {
      return new ErrorMiddlewareDecorator(middleware);
    }
    return new MiddlewareDecorator(middleware);
  }

  public handler(middleware: NotchHandler): NotchMiddleware {
    return new NotchHandlerMiddleware(middleware);
  }

  public lazy(middleware: string | symbol): NotchMiddleware {
    return this.container.get<NotchMiddleware>(middleware);
  }

  public pipeline(middleware: any[]): NotchMiddleware[] {
    return middleware.map((mid) => this.prepare(mid)) as NotchMiddleware[];
  }

  private isMiddlewareClass(middleware: any): middleware is Type<any> {
    const middlewareStr = middleware.toString();
    if (middlewareStr.substring(0, 5) === 'class') {
      return true;
    }
    return false;
  }
}
