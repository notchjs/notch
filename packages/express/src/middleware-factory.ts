import type { Type } from '@armscye/core';
import {
  isFunction,
  isObject,
  isString,
  isSymbol,
  isUndefined,
} from '@hemjs/notions';
import type { NotchHandler, NotchMiddleware } from '@notchjs/types';
import { stringify } from '@notchjs/util';

import {
  ErrorMiddlewareDecorator,
  MiddlewareDecorator,
  NotchHandlerMiddleware,
} from './middleware';
import type { MiddlewareContainer } from './middleware-container';

export class MiddlewareFactory {
  private readonly container: MiddlewareContainer;

  constructor(container: MiddlewareContainer) {
    this.container = container;
  }

  public prepare(middleware: any): NotchMiddleware | NotchMiddleware[] {
    if (Array.isArray(middleware)) {
      return this.pipeline(middleware);
    }

    if (isObject(middleware)) {
      if ((middleware as NotchHandler)?.handle) {
        return this.handler(middleware as NotchHandler);
      }

      if (isUndefined((middleware as NotchMiddleware)?.process)) {
        throw new Error(
          `Invalid middleware (${middleware.constructor?.name}); does not provide 'process' or 'handle' method. `,
        );
      }

      return middleware as NotchMiddleware;
    }

    if (isFunction(middleware)) {
      if (this.isMiddlewareClass(middleware)) {
        const instance = new middleware();

        if (isFunction(instance.handle)) {
          return this.handler(instance);
        }

        if (isUndefined(instance.process)) {
          throw new Error(
            `Invalid middleware (${middleware.name}); does not provide 'process' or 'handle' method. `,
          );
        }

        return instance;
      }

      return this.callable(middleware);
    }

    if (!isString(middleware) && !isSymbol(middleware)) {
      throw new Error(
        `Middleware (${stringify(
          middleware,
        )}) is neither a provider token, a class, a function, or an array of such arguments.`,
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
