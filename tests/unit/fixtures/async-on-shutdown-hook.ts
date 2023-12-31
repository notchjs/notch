import type { ShutdownHook } from '@armscye/hooks';

export class AsyncOnShutdownHook
  implements Omit<ShutdownHook, 'beforeShutdown'>
{
  onShutdown(signal?: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 300);
    });
  }
}
