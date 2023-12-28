import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { Application, LOGGER, NoopLogger, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('environment', () => {
  describe('config', () => {
    let container: Needle;
    let port: number;

    beforeEach(() => {
      const providers = new NotchModule().register()?.['providers'] ?? [];
      container = new Needle(providers);
    });

    beforeEach(async () => {
      port = await randomPort();
    });

    it('should resolve with httpServer when shutdown enabled: true', async () => {
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
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });

    it('should resolve with httpServer when shutdown signals', async () => {
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
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });

    it('should resolve with httpServer when shutdown graceful: true', async () => {
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
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });

    it('should resolve with httpServer when shutdown grace', async () => {
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
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });

    it('should resolve with httpServer when shutdown options', async () => {
      container.addProvider({
        provide: 'config',
        useValue: {
          notch: {
            shutdown: {
              enabled: true,
              signals: ['SIGTERM', 'SIGINT'],
              graceful: true,
              grace: 100,
            },
          },
        },
      });
      const app = container.get<Application>(Application.name);
      const response = await app.listen(port);
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });
  });

  describe('log', () => {
    let container: Needle;
    let port: number;

    beforeEach(() => {
      const providers = new NotchModule().register()?.['providers'] ?? [];
      container = new Needle(providers);
    });

    beforeEach(async () => {
      port = await randomPort();
    });

    it('should resolve with httpServer when shutdown enabled: true', async () => {
      container.addProvider({
        provide: LOGGER,
        useClass: NoopLogger,
      });
      const app = container.get<Application>(Application.name);
      const response = await app.listen(port);
      expect(response).to.equal(app.getHttpServer());
      await app.close();
    });
  });
});
