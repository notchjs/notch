import type { Container } from '@armscye/container';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';
import { randomPort } from '../random-port';

describe('.listen() (Express)', () => {
  let container: Container;
  let app: Application;
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
    app = container.get<Application>(Application.name);
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should resolve with httpServer on success', async () => {
    const response = await app.listen(port);
    expect(response).toEqual(app.getHttpServer());
  });

  it('should resolve with httpServer on success when hostname', async () => {
    const response = await app.listen(port, 'localhost');
    expect(response).toEqual(app.getHttpServer());
  });

  it('should reject if the port is not available', async () => {
    await app.listen(port);

    const seocndContainer = new Needle([
      ...(new NotchModule().register()?.['providers'] ?? []),
      ...(new ExpressModule().register()?.['providers'] ?? []),
      {
        provide: HTTP_ADAPTER,
        useExisting: ExpressAdapter.name,
      },
    ]);
    const secondApp = seocndContainer.get<Application>(Application.name);
    try {
      await secondApp.listen(port);
    } catch (error: any) {
      expect(error.code).toEqual('EADDRINUSE');
    }
  });

  it('should reject if there is an invalid host', async () => {
    try {
      await app.listen(port, '1');
    } catch (error: any) {
      expect(error.code).toEqual('EADDRNOTAVAIL');
    }
  });

  it('should start httpServer when callback', () => {
    return app.listen(port, async () => {
      expect(app.getHttpServer().listening).toEqual(true);
      await app.close();
    });
  });
});
