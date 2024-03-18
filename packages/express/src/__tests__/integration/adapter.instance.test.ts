import { Needle } from '@hemjs/needle';
import * as request from 'supertest';

import { ExpressAdapter, ExpressModule } from '../..';

describe('.getInstance()', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
  });

  it('should be callable', () => {
    expect(typeof adapter.getInstance()).toEqual('function');
  });

  it('should 404 without routes', async () => {
    await request(adapter.getInstance()).get('/').expect(404);
  });
});
