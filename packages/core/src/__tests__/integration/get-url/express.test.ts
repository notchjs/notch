import type { Container } from '@armscye/container';
import type { Logger } from '@armscye/logging';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';
import { randomPort } from '../random-port';

describe('.getUrl() (Express)', () => {
  describe('HTTP', () => {
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

    it('should support HTTP over IPv4', async () => {
      await app.listen(port, '127.0.0.1');
      expect(await app.getUrl()).toEqual(`http://127.0.0.1:${port}`);
      await app.close();
    });

    it('should convert host from [::] to [::1]', async () => {
      await app.listen(port, '::');
      expect(await app.getUrl()).toEqual(`http://[::1]:${port}`);
      await app.close();
    });

    it('should convert host from 0.0.0.0 to 127.0.0.1', async () => {
      await app.listen(port, '0.0.0.0');
      expect(await app.getUrl()).toEqual(`http://127.0.0.1:${port}`);
      await app.close();
    });
    it('should return 127.0.0.1 even in a callback', () => {
      return app.listen(port, '127.0.0.1', async () => {
        expect(await app.getUrl()).toBe(`http://127.0.0.1:${port}`);
        await app.close();
      });
    });

    it('should throw an error when server not listening', async () => {
      const spy = jest.spyOn(app.environment.log as Logger, 'error');
      try {
        await app.getUrl();
      } catch (error) {
        expect(spy).toHaveBeenCalled();
        expect(error).toEqual('Server not listening!');
      }
    });
  });

  describe('HTTPS', () => {
    let container: Container;
    let app: Application;
    let port: number;

    beforeEach(() => {
      const keyPath = join(__dirname, '/../fixtures/key.pem');
      const certPath = join(__dirname, '/../fixtures/cert.pem');
      container = new Needle([
        ...(new NotchModule().register()?.['providers'] ?? []),
        ...(new ExpressModule().register()?.['providers'] ?? []),
        {
          provide: HTTP_ADAPTER,
          useExisting: ExpressAdapter.name,
        },
        {
          provide: 'config',
          useValue: {
            notch: {
              tls: {
                key: readFileSync(keyPath),
                cert: readFileSync(certPath),
              },
            },
          },
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

    it('should support HTTPS over IPv4', async () => {
      await app.listen(port, '127.0.0.1');
      expect(await app.getUrl()).toEqual(`https://127.0.0.1:${port}`);
    });
  });
});
