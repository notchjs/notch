import type { ShutdownHook, StartupHook } from '@armscye/hooks';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';

class OnStartup implements StartupHook {
  onStartup() {}
}

class OnShutdown implements ShutdownHook {
  onShutdown(signal?: string) {}
}

describe('hooks', () => {
  let container: Needle;
  let app: Application;

  beforeEach(() => {
    container = new Needle([
      ...(new NotchModule().register()?.['providers'] ?? []),
      ...(new ExpressModule().register()?.['providers'] ?? []),
      {
        provide: HTTP_ADAPTER,
        useExisting: ExpressAdapter.name,
      },
      { provide: OnStartup.name, useClass: OnStartup },
      { provide: OnShutdown.name, useClass: OnShutdown },
      {
        provide: 'config',
        useValue: {
          hooks: [OnStartup.name, OnShutdown.name],
        },
      },
    ]);
    app = container.get<Application>(Application.name);
  });

  it('should call startup hooks', async () => {
    const onStartup = container.get<StartupHook>(OnStartup.name);
    const spyOnStartup = jest.spyOn(onStartup, 'onStartup');
    await app.init();
    expect(spyOnStartup).toHaveBeenCalled();
    expect(spyOnStartup).toHaveBeenCalledWith();
  });

  it('should call shutdown hooks', async () => {
    const onShutdown = container.get<ShutdownHook>(OnShutdown.name);
    const spyOnShutdown = jest.spyOn(onShutdown, 'onShutdown');
    await app.close('SIGTERM');
    expect(spyOnShutdown).toHaveBeenCalled();
    expect(spyOnShutdown).toHaveBeenCalledWith('SIGTERM');
  });
});
