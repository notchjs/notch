import { Needle } from '@hemjs/needle';

import { ExpressAdapter, ExpressModule } from '../..';
import { randomPort } from './random-port';

describe('stoppable', () => {
  let container: Needle;
  let port: number;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    container = new Needle(providers);
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  it('should return undefined for uninitialized server', () => {
    const adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    expect(adapter.close()).toBeUndefined;
  });

  it('should stop server when graceful (default grace period)', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            graceful: true,
          },
        },
      },
    });
    const adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();

    adapter.listen(port);
    expect(adapter.getHttpServer().listening).toEqual(true);

    await adapter.close();
    expect(adapter.getHttpServer().listening).toEqual(false);
  });

  it('should stop server when graceful (custom grace period)', async () => {
    container.addProvider({
      provide: 'config',
      useValue: {
        notch: {
          shutdown: {
            graceful: true,
            grace: 100,
          },
        },
      },
    });
    const adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer();

    adapter.listen(port);
    expect(adapter.getHttpServer().listening).toEqual(true);

    await adapter.close();
    expect(adapter.getHttpServer().listening).toEqual(false);
  });
});
