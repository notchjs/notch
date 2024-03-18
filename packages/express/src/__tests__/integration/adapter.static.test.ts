import { Needle } from '@hemjs/needle';
import { join } from 'path';
import * as request from 'supertest';

import { ExpressAdapter, ExpressModule } from '../..';

describe('.useStaticAssets()', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();
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
