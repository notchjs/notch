import type { ShutdownHook } from '@armscye/hooks';

export class BeforeShutdownHook implements Omit<ShutdownHook, 'onShutdown'> {
  beforeShutdown(signal?: string) {}
}
