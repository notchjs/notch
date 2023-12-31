import { isFunction, isObject, isString, isSymbol } from '@hemjs/notions';

import type { HookContainer } from './hook-container';
import type { HookRecord } from './interfaces';
import { stringify } from './utils/stringify';

export class HookFactory {
  constructor(private readonly container: HookContainer) {}

  public prepare(hook: any): HookRecord | HookRecord[] {
    if (Array.isArray(hook)) {
      return this.pipeline(hook);
    }

    if (isObject(hook)) {
      return {
        name: hook.constructor?.name,
        hook: hook,
      };
    }

    if (isFunction(hook)) {
      const funcAsString = hook.toString();
      const isClass = /^class\s/.test(funcAsString);

      if (isClass) {
        return {
          name: hook.name,
          hook: new hook(),
        };
      }

      return {
        name: hook.name,
        hook: hook(),
      };
    }

    if (!isString(hook) && !isSymbol(hook)) {
      throw new Error(
        `Hook (${stringify(
          hook,
        )}) is neither a provider token, a class, a function, or an array of such arguments.`,
      );
    }

    return {
      name: isSymbol(hook) ? hook.toString() : hook,
      hook: this.lazy(hook),
    };
  }

  public lazy(hook: string | symbol) {
    return this.container.get(hook);
  }

  public pipeline(hooks: any[]): any[] {
    return hooks.map((hook) => this.prepare(hook));
  }
}
