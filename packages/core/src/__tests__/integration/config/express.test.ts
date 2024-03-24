import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';
import { randomPort } from '../random-port';

describe('config (Express)', () => {
  let container: Needle;
  let port: number;

  beforeEach(() => {
    container = new Needle([
      ...(new NotchModule().register()?.['providers'] ?? []),
      ...(new ExpressModule().register()?.['providers'] ?? []),
      {
        provide: HTTP_ADAPTER,
        useExisting: ExpressAdapter.name,
      },
    ]);
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  it('should return httpServer when shutdown is enabled', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            enabled: true,
          },
        },
      },
    });
    const app = container.get<Application>(Application.name);
    const response = await app.listen(port);
    expect(response).toEqual(app.getHttpServer());
    await app.close();
  });

  it('should return httpServer when shutdown signals are specified', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            enabled: true,
            signals: ['SIGTERM', 'SIGINT'],
          },
        },
      },
    });
    const app = container.get<Application>(Application.name);
    const response = await app.listen(port);
    expect(response).toEqual(app.getHttpServer());
    await app.close();
  });

  it('should return httpServer when graceful shutdown is enabled', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            graceful: true,
          },
        },
      },
    });
    const app = container.get<Application>(Application.name);
    const response = await app.listen(port);
    expect(response).toEqual(app.getHttpServer());
    await app.close();
  });

  it('should return httpServer when shutdown grace period is configured', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            graceful: true,
            grace: 100,
          },
        },
      },
    });
    const app = container.get<Application>(Application.name);
    const response = await app.listen(port);
    expect(response).toEqual(app.getHttpServer());
    await app.close();
  });
});
