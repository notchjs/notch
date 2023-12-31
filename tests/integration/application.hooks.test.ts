import type { ShutdownHook, StartupHook } from '@armscye/hooks';
import { Needle } from '@hemjs/needle';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Application, NotchModule } from '../../src';

class OnStartup implements StartupHook {
  onStartup() {}
}

class BeforeShutdown implements Omit<ShutdownHook, 'onShutdown'> {
  beforeShutdown(signal?: string) {}
}

class OnShutdown implements Omit<ShutdownHook, 'beforeShutdown'> {
  onShutdown(signal?: string) {}
}

describe('hooks', () => {
  let container: Needle;
  let app: Application;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    container = new Needle([
      ...providers,
      { provide: OnStartup.name, useClass: OnStartup },
      { provide: OnShutdown.name, useClass: OnShutdown },
      { provide: BeforeShutdown.name, useClass: BeforeShutdown },
      {
        provide: 'config',
        useValue: {
          notch: {
            shutdown: {
              graceful: true,
              grace: 100,
              mercy: 100,
            },
          },
          hooks: [OnStartup.name, BeforeShutdown.name, OnShutdown.name],
        },
      },
    ]);
    app = container.get<Application>(Application.name);
  });

  it('should call startup hooks', async () => {
    const onStartup = container.get<StartupHook>(OnStartup.name);
    const spyOnStartup = sinon.spy(onStartup, 'onStartup');
    await app.init();
    expect(spyOnStartup.called).to.be.true;
  });

  it('should call shutdown hooks', async () => {
    const beforeShutdown = container.get<ShutdownHook>(BeforeShutdown.name);
    const onShutdown = container.get<ShutdownHook>(OnShutdown.name);
    const spyBeforeShutdown = sinon.spy(beforeShutdown, 'beforeShutdown');
    const spyOnShutdown = sinon.spy(onShutdown, 'onShutdown');
    await app.close('SIGTERM');
    expect(spyBeforeShutdown.called).to.be.true;
    expect(spyOnShutdown.called).to.be.true;
  });
});
