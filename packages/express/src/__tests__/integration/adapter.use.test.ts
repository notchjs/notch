import { Needle } from '@hemjs/needle';
import * as request from 'supertest';

import { ExpressAdapter, ExpressModule } from '../..';

describe('.use()', () => {
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

  it('should behave like express', async () => {
    const calls: string[] = [];

    adapter.use((req: any, res: any, next: any) => {
      calls.push('one');
      next();
    });

    adapter.use((req: any, res: any, next: any) => {
      calls.push('two');
      next();
    });

    adapter.use((req: any, res: any) => {
      let buf = '';
      res.setHeader('Content-Type', 'application/json');
      req.setEncoding('utf8');
      req.on('data', (chunk: string) => {
        buf += chunk;
      });
      req.on('end', () => {
        res.end(buf);
      });
    });

    await request(adapter.getHttpServer())
      .get('/')
      .set('Content-Type', 'application/json')
      .send('{"foo":"bar"}')
      .expect('Content-Type', 'application/json')
      .expect(() => {
        expect(calls).toEqual(['one', 'two']);
      })
      .expect(200, '{"foo":"bar"}');
  });
});
