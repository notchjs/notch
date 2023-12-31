import type { StartupHook } from '@armscye/hooks';

export class OnStartupHookWithError implements StartupHook {
  onStartup() {
    throw new Error('Error!');
  }
}
