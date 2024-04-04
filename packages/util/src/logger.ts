import type { Logger } from '@armscye/logging';

export class NoopLogger implements Logger {
  trace(msg: any, ...args: unknown[]) {}
  debug(msg: any, ...args: unknown[]) {}
  info(msg: any, ...args: unknown[]) {}
  warn(msg: any, ...args: unknown[]) {}
  error(msg: any, ...args: unknown[]) {}
}
