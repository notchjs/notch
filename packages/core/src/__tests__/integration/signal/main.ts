import { ShutdownHook } from '@armscye/hooks';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';

const SIGNAL = process.argv[2];

class Hook implements ShutdownHook {
  onShutdown(signal?: string) {
    console.log('onShutdown ' + signal);
  }
}

async function main() {
  const container = new Needle([
    ...(new NotchModule().register()?.['providers'] ?? []),
    ...(new ExpressModule().register()?.['providers'] ?? []),
    {
      provide: HTTP_ADAPTER,
      useExisting: ExpressAdapter.name,
    },
    {
      provide: Hook.name,
      useClass: Hook,
    },
    {
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            enabled: true,
            signals: ['SIGTERM', 'SIGINT'],
          },
        },
        hooks: [Hook.name],
      },
    },
  ]);
  const app = container.get<Application>(Application.name);
  await app.listen(4444);
  process.kill(process.pid, SIGNAL);
}

main();
