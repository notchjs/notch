import type { Provider } from '@armscye/container';
import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiSubset from 'chai-subset';

import {
  Application,
  ErrorHandler,
  ErrorHandlerHost,
  ErrorResponseGenerator,
  ErrorResponseGeneratorHost,
  HttpAdapter,
  LoggerHost,
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
  NotchModule,
  NotFoundHandler,
} from '../../src';

chai.use(chaiSubset);

describe('NotchModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new NotchModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).to.containSubset([{ provide: NotFoundHandler.name }]);
    expect(providers).to.containSubset([
      { provide: ErrorResponseGenerator.name },
    ]);
    expect(providers).to.containSubset([
      { provide: ErrorResponseGeneratorHost.name },
    ]);
    expect(providers).to.containSubset([{ provide: ErrorHandler.name }]);
    expect(providers).to.containSubset([{ provide: ErrorHandlerHost.name }]);
    expect(providers).to.containSubset([{ provide: MiddlewareContainer.name }]);
    expect(providers).to.containSubset([{ provide: MiddlewareFactory.name }]);
    expect(providers).to.containSubset([{ provide: MiddlewareProxy.name }]);
    expect(providers).to.containSubset([{ provide: LoggerHost.name }]);
    expect(providers).to.containSubset([{ provide: HttpAdapter.name }]);
    expect(providers).to.containSubset([{ provide: Application.name }]);
  });
});
