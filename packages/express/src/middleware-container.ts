import type { Container, ProviderToken } from '@armscye/container';
import { stringify } from '@notchjs/util';

import { NotchHandlerMiddleware } from './middleware';

export class MiddlewareContainer implements Container {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  get<T>(token: ProviderToken): T {
    if (!this.has(token)) {
      throw new Error(
        `Cannot fetch middleware provider for (${stringify(
          token,
        )}); provider not registered.`,
      );
    }

    let middleware = this.container.get<any>(token);

    if (middleware.handle) {
      middleware = new NotchHandlerMiddleware(middleware);
    }

    if (!middleware.process) {
      throw new Error(
        `Invalid middleware ${stringify(
          middleware,
        )}; does not provide 'process' or 'handle' method.`,
      );
    }

    return middleware as T;
  }

  has(token: ProviderToken): boolean {
    if (this.container.has(token)) {
      return true;
    }

    return false;
  }
}
