import { Needle } from '@hemjs/needle';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import { join } from 'path';

import { HttpAdapter, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('HTTPS', () => {
  let adapter: HttpAdapter;
  let port: number;

  beforeEach(() => {
    const keyPath = join(__dirname, '/fixtures/key.pem');
    const certPath = join(__dirname, '/fixtures/cert.pem');
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    adapter.initHttpServer({
      tls: {
        key: readFileSync(keyPath),
        cert: readFileSync(certPath),
      },
    });
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should support HTTPS over IPv4', async () => {
    adapter.listen(port);
    expect(adapter.getHttpServer().listening).to.equal(true);
  });
});
