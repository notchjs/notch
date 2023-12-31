import type { ShutdownHook } from '@armscye/hooks';

export class OnShutdownHook implements Omit<ShutdownHook, 'beforeShutdown'> {
  onShutdown(signal?: string) {}
}
