import type { Container } from '@armscye/container';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';
import { randomPort } from '../random-port';

describe('.init() (Express)', () => {
  let container: Container;
  let app: Application;
  let port: number;

  beforeEach(() => {
    container = new Needle([
      ...(new NotchModule().register()?.['providers'] ?? []),
      ...(new ExpressModule().register()?.['providers'] ?? []),
      {
        provide: HTTP_ADAPTER,
        useExisting: ExpressAdapter.name,
      },
    ]);
    app = container.get<Application>(Application.name);
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should skip initialization if already init', async () => {
    await app.init();
    await app.init();
    expect(app).toBeInstanceOf(Application);
  });

  it('should skip initialization if already init when listen', async () => {
    await app.init();
    await app.listen(port);
    expect(app).toBeInstanceOf(Application);
  });
});
