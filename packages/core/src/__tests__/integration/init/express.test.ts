import type { Container } from '@armscye/container';
import type { Logger } from '@armscye/logging';
import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';
import { randomPort } from '../random-port';

describe('.init() (Express)', () => {
  let container: Container;
  let logger: Logger;
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
    logger = app.environment.log as Logger;
  });

  beforeEach(async () => {
    port = await randomPort();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should initialize application', async () => {
    const spy = jest.spyOn(logger, 'info');
    await app.init();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should skip initialization if already init', async () => {
    const spy = jest.spyOn(logger, 'info');
    await app.init();
    await app.init();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should skip initialization if already init when listen', async () => {
    const spy = jest.spyOn(logger, 'info');
    await app.init();
    await app.listen(port);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
