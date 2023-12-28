import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { HttpAdapter, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('stoppable', () => {
  let container: Needle;
  let port: number;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    container = new Needle(providers);
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  it('should return undefined for uninitialized server', () => {
    const adapter = container.get<HttpAdapter>(HttpAdapter.name);
    expect(adapter.close()).to.be.undefined;
  });

  it('should stop server when grace period', async () => {
    const adapter = container.get<HttpAdapter>(HttpAdapter.name);

    adapter.initHttpServer({
      shutdown: {
        graceful: true,
        grace: 100,
      },
    });

    adapter.listen(port);
    expect(adapter.getHttpServer().listening).to.equal(true);

    await adapter.close();
    expect(adapter.getHttpServer().listening).to.equal(false);
  });
});
