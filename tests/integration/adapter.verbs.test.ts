import { Needle } from '@hemjs/needle';
import * as request from 'supertest';

import { HttpAdapter, NotchModule } from '../../src';

describe('HTTP Verbs', () => {
  let adapter: HttpAdapter;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    adapter.initHttpServer();
  });

  afterEach(async () => {
    await adapter.close();
  });

  describe('.get()', () => {
    it('should support GET method', async () => {
      adapter.get('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).get('/').expect(200, 'value');
    });
  });

  describe('.post()', () => {
    it('should support POST method', async () => {
      adapter.post('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).post('/').expect(200, 'value');
    });
  });

  describe('.head()', () => {
    it('should support HEAD method', async () => {
      adapter.head('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).head('/').expect(200);
    });
  });

  describe('.delete()', () => {
    it('should support DELETE method', async () => {
      adapter.delete('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).delete('/').expect(200, 'value');
    });
  });

  describe('.put()', () => {
    it('should support PUT method', async () => {
      adapter.put('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).put('/').expect(200, 'value');
    });
  });

  describe('.patch()', () => {
    it('should support PATCH method', async () => {
      adapter.patch('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).patch('/').expect(200, 'value');
    });
  });

  describe('.all()', () => {
    it('should support ALL method', async () => {
      adapter.all('/', (req: any, res: any) => res.end(req.method));
      await request(adapter.getHttpServer()).get('/').expect(200, 'GET');
    });
  });

  describe('.options()', () => {
    it('should support OPTIONS method', async () => {
      adapter.get('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer())
        .options('/')
        .expect(200, 'GET,HEAD');
    });
  });
});
