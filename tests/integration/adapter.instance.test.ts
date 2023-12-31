import { Needle } from '@hemjs/needle';
import { expect } from 'chai';
import * as request from 'supertest';

import { HttpAdapter, NotchModule } from '../../src';

describe('.getInstance()', () => {
  let adapter: HttpAdapter;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
  });

  it('should be callable', () => {
    expect(typeof adapter.getInstance()).to.equal('function');
  });

  it('should 404 without routes', async () => {
    await request(adapter.getInstance()).get('/').expect(404);
  });
});
