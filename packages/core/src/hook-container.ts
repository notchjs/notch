import type { Container, ProviderToken } from '@armscye/container';
import { stringify } from '@notchjs/util';

export class HookContainer implements Container {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  get<T>(token: ProviderToken): T {
    if (!this.has(token)) {
      throw new Error(
        `Cannot fetch hook provider for (${stringify(
          token,
        )}); provider not registered.`,
      );
    }

    return this.container.get(token);
  }

  has(token: ProviderToken): boolean {
    if (this.container.has(token)) {
      return true;
    }

    return false;
  }
}
