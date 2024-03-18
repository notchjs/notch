import { Needle } from '@hemjs/needle';
import { readFileSync } from 'fs';
import { join } from 'path';

import { ExpressAdapter, ExpressModule } from '../..';
import { randomPort } from './random-port';

describe('HTTPS', () => {
  let adapter: ExpressAdapter;
  let port: number;

  beforeEach(() => {
    const keyPath = join(__dirname, '/fixtures/key.pem');
    const certPath = join(__dirname, '/fixtures/cert.pem');
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          tls: {
            key: readFileSync(keyPath),
            cert: readFileSync(certPath),
          },
        },
      },
    });
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should support HTTPS over IPv4', async () => {
    adapter.listen(port);
    expect(adapter.getHttpServer().listening).toEqual(true);
  });
});
