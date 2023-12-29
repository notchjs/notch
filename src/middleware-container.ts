import type { Container, ProviderToken } from '@armscye/container';
import type { Type } from '@armscye/core';
import { isFunction } from '@hemjs/notions';

import { NotchHandlerMiddleware } from './middleware';

export class MiddlewareContainer implements Container {
  constructor(private readonly container: Container) {}

  get<T>(token: ProviderToken | Type<any>): T {
    if (!this.has(token)) {
      throw new Error('Missing dependency middleware provider');
    }

    let middleware: any;

    if (this.container.has(token as ProviderToken)) {
      middleware = this.container.get(token as ProviderToken);
    } else {
      const metatype = token as Type<any>;
      middleware = new metatype();
    }

    if (middleware.handle) {
      middleware = new NotchHandlerMiddleware(middleware);
    }

    if (!middleware.process) {
      throw new Error('Invalid middleware');
    }

    return middleware as T;
  }

  has(token: ProviderToken | Type): boolean {
    if (this.container.has(token as ProviderToken)) {
      return true;
    }
    return isFunction(token);
  }
}
