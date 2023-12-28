import type { Logger } from '@armscye/logging';

export class NoopLogger implements Logger {
  debug(msg: any, ...args: unknown[]) {}
  info(msg: any, ...args: unknown[]) {}
  warning(msg: any, ...args: unknown[]) {}
  error(msg: any, ...args: unknown[]) {}
  critical(msg: any, ...args: unknown[]) {}
  getLogger(name: string): this {
    return this;
  }
}
