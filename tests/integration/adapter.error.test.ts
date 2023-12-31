import { Needle } from '@hemjs/needle';
import * as request from 'supertest';

import {
  ErrorHandler,
  HttpAdapter,
  NotchModule,
  NotFoundHandler,
} from '../../src';

describe('error', () => {
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

  describe('.setErrorHandler()', () => {
    it('should invoke error handler', async () => {
      adapter.get('/', (req: any, res: any, next: any) =>
        next(new Error('boom!')),
      );
      adapter.setErrorHandler((err: any, req: any, res: any, next: any) => {
        res.status(500).end(err.message);
      });
      await request(adapter.getHttpServer()).get('/').expect(500, 'boom!');
    });

    it('should invoke error handler when path', async () => {
      adapter.get('/api', (req: any, res: any, next: any) =>
        next(new Error('boom!')),
      );
      adapter.setErrorHandler(
        '/api',
        (err: any, req: any, res: any, next: any) => {
          res.status(500).end(err.message);
        },
      );
      await request(adapter.getHttpServer()).get('/api').expect(500, 'boom!');
    });

    it('should invoke error handler when notch middleware', async () => {
      adapter.get('/foo', (req: any, res: any, next: any) =>
        next(new Error('boom!')),
      );
      adapter.setErrorHandler(ErrorHandler.name);
      await request(adapter.getHttpServer())
        .get('/foo')
        .expect(500, { statusCode: 500, message: 'boom!' });
    });
  });

  describe('.setNotFoundHandler()', () => {
    it('should invoke not-found handler', async () => {
      adapter.setNotFoundHandler((req: any, res: any, next: any) => {
        res.status(404).send(`Cannot ${req.method} ${req.url}`);
      });
      await request(adapter.getHttpServer())
        .get('/')
        .expect(404, 'Cannot GET /');
    });

    it('should invoke not-found handler when path', async () => {
      adapter.setNotFoundHandler('/api', (req: any, res: any, next: any) => {
        res.status(404).send(`Cannot ${req.method} ${req.url}`);
      });
      await request(adapter.getHttpServer())
        .get('/api')
        .expect(404, 'Cannot GET /');
    });

    it('should invoke not-found handler when nocth handler', async () => {
      adapter.setNotFoundHandler(NotFoundHandler.name);
      await request(adapter.getHttpServer())
        .get('/foo')
        .expect(404, 'Cannot GET /foo');
    });
  });
});
