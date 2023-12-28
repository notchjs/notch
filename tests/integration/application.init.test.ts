import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { Application, NotchModule } from '../../src';
import { randomPort } from './random-port';

describe('.init()', () => {
  let app: Application;
  let port: number;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
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
    expect(app).to.be.instanceOf(Application);
  });

  it('should skip initialization if already init when listen', async () => {
    await app.init();
    await app.listen(port);
    expect(app).to.be.instanceOf(Application);
  });
});
