import type { HookProvider, ShutdownHook, StartupHook } from '@armscye/hooks';
import { isFunction, isNil } from '@hemjs/notions';
import { iterate } from 'iterare';

import type { HookFactory } from './hook-factory';
import type { HookRecord } from './interfaces';

export class HookCollector {
  private readonly records: HookRecord[];

  constructor(factory: HookFactory, hooks: HookProvider[] = []) {
    this.records = factory.prepare(hooks) as HookRecord[];
  }

  public async addStartupHook(): Promise<void> {
    await Promise.all(this.runStartupHook(this.records));
  }

  public async addShutdownHook(signal?: string): Promise<void> {
    await Promise.all(this.runShutdownHook(this.records, signal));
  }

  private runStartupHook(records: HookRecord[]): Promise<any>[] {
    return iterate(records)
      .filter((record) => !isNil(record))
      .filter(({ hook }) => this.isStartupHook(hook))
      .map(async ({ hook }) => (hook as StartupHook).onStartup())
      .toArray();
  }

  private runShutdownHook(
    records: HookRecord[],
    signal?: string,
  ): Promise<any>[] {
    return iterate(records)
      .filter((record) => !isNil(record))
      .filter(({ hook }) => this.isShutdownHook(hook))
      .map(async ({ hook }) => (hook as ShutdownHook).onShutdown(signal))
      .toArray();
  }

  private isStartupHook(hook: unknown): hook is StartupHook {
    return isFunction((hook as StartupHook).onStartup);
  }

  private isShutdownHook(hook: unknown): hook is ShutdownHook {
    return isFunction((hook as ShutdownHook).onShutdown);
  }
}
