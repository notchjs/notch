import { Needle } from '@hemjs/needle';

import { ExpressAdapter, ExpressModule } from '../..';
import { randomPort } from './random-port';

describe('.listen()', () => {
  let adapter: ExpressAdapter;
  let port: number;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should resolve with httpServer on success', () => {
    expect(adapter.listen(port)).toEqual(adapter.getHttpServer());
  });
});
