import { Needle } from '@hemjs/needle';
import * as request from 'supertest';

import {
  ERROR_HANDLER,
  ERROR_RESPONSE_GENERATOR,
  ErrorHandler,
  ErrorResponseGenerator,
  HttpAdapter,
  NotchModule,
} from '../../src';

describe('proxy', () => {
  let container: Needle;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    container = new Needle(providers);
  });

  describe('with error handler', () => {
    let adapter: HttpAdapter;

    beforeEach(() => {
      container.addProvider({
        provide: ERROR_HANDLER,
        useExisting: ErrorHandler.name,
      });
      adapter = container.get<HttpAdapter>(HttpAdapter.name);
      adapter.initHttpServer({} as any);
    });

    afterEach(async () => {
      await adapter.close();
    });

    it('should not invoke error handler when no error', async () => {
      adapter.get('/', (req: any, res: any, next: any) => res.send('value'));
      await request(adapter.getHttpServer()).get('/').expect(200, 'value');
    });

    it('should invoke error handler when error', async () => {
      adapter.get('/', (req: any, res: any, next: any) => {
        throw new Error('Boom');
      });
      await request(adapter.getHttpServer()).get('/').expect(500, {
        statusCode: 500,
        message: 'Boom',
      });
    });
  });

  describe('with custom error response generator', () => {
    let adapter: HttpAdapter;

    beforeEach(() => {
      container.addProvider({
        provide: ERROR_RESPONSE_GENERATOR,
        useExisting: ErrorResponseGenerator.name,
      });
      container.addProvider({
        provide: ERROR_HANDLER,
        useExisting: ErrorHandler.name,
      });
      adapter = container.get<HttpAdapter>(HttpAdapter.name);
      adapter.initHttpServer({} as any);
    });

    afterEach(async () => {
      await adapter.close();
    });

    it('should invoke error handler when error', async () => {
      adapter.get('/', (req: any, res: any, next: any) => {
        throw new Error('Boom');
      });
      await request(adapter.getHttpServer()).get('/').expect(500, {
        statusCode: 500,
        message: 'Boom',
      });
    });
  });
});
