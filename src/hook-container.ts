import type { Container, ProviderToken } from '@armscye/container';

import { stringify } from './utils/stringify';

export class HookContainer implements Container {
  constructor(private readonly container: Container) {}

  get<T>(token: ProviderToken): T {
    if (!this.has(token)) {
      throw new Error(
        `Cannot fetch hook provider for (${stringify(
          token,
        )}); provider not registered.`,
      );
    }

    return this.container.get(token) as T;
  }

  has(token: ProviderToken): boolean {
    if (this.container.has(token as ProviderToken)) {
      return true;
    }

    return false;
  }
}
