import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { HttpAdapter, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('.listen()', () => {
  let adapter: HttpAdapter;
  let port: number;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    adapter.initHttpServer();
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should resolve with httpServer on success', () => {
    expect(adapter.listen(port)).to.equal(adapter.getHttpServer());
  });
});
