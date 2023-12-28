import type { Provider } from '@armscye/container';
import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiSubset from 'chai-subset';

import { Application, HttpAdapter, LoggerHost, NotchModule } from '../../src';

chai.use(chaiSubset);

describe('NotchModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new NotchModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).to.containSubset([{ provide: LoggerHost.name }]);
    expect(providers).to.containSubset([{ provide: HttpAdapter.name }]);
    expect(providers).to.containSubset([{ provide: Application.name }]);
  });
});
