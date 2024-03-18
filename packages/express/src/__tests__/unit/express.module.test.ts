import type { Provider } from '@armscye/container';

import {
  ErrorHandler,
  ErrorHandlerHost,
  ErrorResponseGenerator,
  ErrorResponseGeneratorHost,
  ExpressAdapter,
  ExpressModule,
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
  NotFoundHandler,
} from '../..';

describe('ExpressModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new ExpressModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: NotFoundHandler.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          provide: ErrorResponseGenerator.name,
        }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          provide: ErrorResponseGeneratorHost.name,
        }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: ErrorHandler.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: ErrorHandlerHost.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareContainer.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareFactory.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareProxy.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: ExpressAdapter.name }),
      ]),
    );
  });
});
