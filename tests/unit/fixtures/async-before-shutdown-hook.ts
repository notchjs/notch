import type { ShutdownHook } from '@armscye/hooks';

export class AsyncBeforeShutdownHook
  implements Omit<ShutdownHook, 'onShutdown'>
{
  beforeShutdown(signal?: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 300);
    });
  }
}
