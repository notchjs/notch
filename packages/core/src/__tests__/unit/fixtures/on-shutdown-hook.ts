import type { ShutdownHook } from '@armscye/hooks';

export class OnShutdownHook implements ShutdownHook {
  onShutdown(signal?: string) {}
}
