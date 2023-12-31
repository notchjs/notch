import type { HookProvider, ShutdownHook, StartupHook } from '@armscye/hooks';
import { deadline, isFunction, isNil, isNumber } from '@hemjs/notions';
import { iterate } from 'iterare';

import type { HookFactory } from './hook-factory';
import type { HookRecord, ShutdownHookOptions } from './interfaces';

export class HookCollector {
  private records: HookRecord[] = [];

  constructor(
    private readonly factory: HookFactory,
    readonly hooks: HookProvider[] = [],
  ) {
    this.initialize(hooks);
  }

  public async onStartup(): Promise<void> {
    await Promise.all(this.runStartupHook(this.records));
  }

  public async beforeShutdown(
    options: ShutdownHookOptions = {},
  ): Promise<void> {
    await Promise.all(this.runBeforeShutdownHook(this.records, options));
  }

  public async onShutdown(options: ShutdownHookOptions = {}): Promise<void> {
    await Promise.all(this.runShutdownHook(this.records, options));
  }

  public initialize(hooks: HookProvider[]): void {
    this.records = this.factory.prepare(hooks) as HookRecord[];
  }

  private runStartupHook(records: HookRecord[]): Promise<any>[] {
    return iterate(records)
      .filter((record) => !isNil(record))
      .filter(({ hook }) => this.isStartupHook(hook))
      .map(async ({ name, hook }) => {
        try {
          return (hook as StartupHook).onStartup();
        } catch (err) {
          console.warn(`Failed executing onStartup hook (${name})`);
          throw err;
        }
      })
      .toArray();
  }

  private runBeforeShutdownHook(
    records: HookRecord[],
    options: ShutdownHookOptions,
  ): Promise<any>[] {
    return iterate(records)
      .filter((record) => !isNil(record))
      .filter(({ hook }) => this.isBeforeShutdownHook(hook))
      .map(async ({ name, hook }) => {
        try {
          if (!isNumber(options.mercy)) {
            return (hook as ShutdownHook).beforeShutdown(options.signal);
          }

          return await deadline(
            Promise.resolve(
              (hook as ShutdownHook).beforeShutdown(options.signal),
            ),
            options.mercy,
          );
        } catch (err) {
          console.warn(`Failed executing beforeShutdown hook (${name})`);
          throw err;
        }
      })
      .toArray();
  }

  private runShutdownHook(
    records: HookRecord[],
    options: ShutdownHookOptions,
  ): Promise<any>[] {
    return iterate(records)
      .filter((record) => !isNil(record))
      .filter(({ hook }) => this.isShutdownHook(hook))
      .map(async ({ name, hook }) => {
        try {
          if (!isNumber(options.mercy)) {
            return (hook as ShutdownHook).onShutdown(options.signal);
          }

          return await deadline(
            Promise.resolve((hook as ShutdownHook).onShutdown(options.signal)),
            options.mercy,
          );
        } catch (err) {
          console.warn(`Failed executing onShutdown hook (${name})`);
          throw err;
        }
      })
      .toArray();
  }

  private isStartupHook(hook: unknown): hook is StartupHook {
    return isFunction((hook as StartupHook).onStartup);
  }

  private isBeforeShutdownHook(hook: unknown): hook is ShutdownHook {
    return isFunction((hook as ShutdownHook).beforeShutdown);
  }

  private isShutdownHook(hook: unknown): hook is ShutdownHook {
    return isFunction((hook as ShutdownHook).onShutdown);
  }
}
