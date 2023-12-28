import type { Provider } from '@armscye/container';
import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { Application, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('.listen()', () => {
  let providers: Provider[];
  let app: Application;
  let port: number;

  beforeEach(() => {
    providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
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
    expect(response).to.equal(app.getHttpServer());
  });

  it('should resolve with httpServer on success when hostname', async () => {
    const response = await app.listen(port, 'localhost');
    expect(response).to.equal(app.getHttpServer());
  });

  it('should reject if the port is not available', async () => {
    await app.listen(port);

    const seocndContainer = new Needle(providers);
    const secondApp = seocndContainer.get<Application>(Application.name);
    try {
      await secondApp.listen(port);
    } catch (error: any) {
      expect(error.code).to.equal('EADDRINUSE');
    }
  });

  it('should reject if there is an invalid host', async () => {
    try {
      await app.listen(port, '1');
    } catch (error: any) {
      expect(error.code).to.equal('EADDRNOTAVAIL');
    }
  });

  it('should start httpServer when callback', () => {
    return app.listen(port, async () => {
      expect(app.getHttpServer().listening).to.equal(true);
      await app.close();
    });
  });
});
