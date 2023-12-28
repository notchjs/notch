import { Needle } from '@hemjs/needle';
import { expect } from 'chai';

import { Application, HttpAdapter, NotchModule } from '../../src';

describe('HttpAdapter', () => {
  let app: Application;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    app = container.get<Application>(Application.name);
  });

  it('should return when HttpAdapter present', () => {
    expect(app).to.be.instanceOf(Application);
    expect(app.getHttpAdapter()).to.be.instanceOf(HttpAdapter);
  });
});
