import { Needle } from '@hemjs/needle';
import { join } from 'path';
import * as request from 'supertest';

import { HttpAdapter, NotchModule } from '../../src';

describe('.useStaticAssets()', () => {
  let adapter: HttpAdapter;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    adapter.initHttpServer({} as any);
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should serve static files', async () => {
    adapter.useStaticAssets(join(__dirname, '/fixtures'), {});
    await request(adapter.getHttpServer())
      .get('/todo.txt')
      .expect(200, '- groceries');
  });

  it('should serve static files when prefix', async () => {
    adapter.useStaticAssets(join(__dirname, '/fixtures'), { prefix: '/todo' });
    await request(adapter.getHttpServer())
      .get('/todo/todo.txt')
      .expect(200, '- groceries');
  });
});
