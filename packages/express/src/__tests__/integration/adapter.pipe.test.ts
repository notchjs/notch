import { Needle } from '@hemjs/needle';
import * as http from 'http';
import * as request from 'supertest';

import { ExpressAdapter, ExpressModule } from '../..';

describe('.pipe()', () => {
  let adapter: ExpressAdapter;
  let server: http.Server;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();
    server = adapter.getHttpServer();
  });

  afterEach(async () => {
    await adapter.close();
  });

  describe('.pipe(middleware)', () => {
    it('should invoke middleware for all requests', async () => {
      adapter.pipe((req: any, res: any) => {
        res.send('saw ' + req.method + ' ' + req.url);
      });

      await request(server).get('/').expect(200, 'saw GET /');
      await request(server).post('/foo').expect(200, 'saw POST /foo');
    });
  });

  describe('.pipe(path, middleware)', () => {
    it('should invoke middleware for all requests starting with path', async () => {
      adapter.pipe('/foo', (req: any, res: any) => {
        res.send('saw ' + req.method + ' ' + req.url);
      });

      await request(server).get('/').expect(404);
      await request(server).post('/foo').expect(200, 'saw POST /');
      await request(server).post('/foo/bar').expect(200, 'saw POST /bar');
    });
  });
});
