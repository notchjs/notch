import type { Type } from '@armscye/core';
import { isFunction, isObject, isString, isSymbol } from '@hemjs/notions';
import { stringify } from '@notchjs/util';

import type { HookContainer } from './hook-container';
import type { HookRecord } from './interfaces';

export class HookFactory {
  private readonly container: HookContainer;

  constructor(container: HookContainer) {
    this.container = container;
  }

  prepare(hook: any): HookRecord | HookRecord[] {
    if (Array.isArray(hook)) {
      return this.pipeline(hook);
    }

    if (isObject(hook)) {
      return {
        name: hook.constructor?.name,
        hook: hook,
      };
    }

    if (this.isClass(hook)) {
      return {
        name: hook.name,
        hook: new hook(),
      };
    }

    if (isFunction(hook)) {
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

  lazy<T>(hook: string | symbol): T {
    return this.container.get<T>(hook);
  }

  pipeline(hooks: any[]): any[] {
    return hooks.map((hook) => this.prepare(hook));
  }

  private isClass(hook: any): hook is Type<any> {
    const hookStr = hook.toString();

    if (hookStr.substring(0, 5) === 'class') {
      return true;
    }

    return false;
  }
}
