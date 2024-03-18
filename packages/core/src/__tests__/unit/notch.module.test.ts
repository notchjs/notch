import type { Provider } from '@armscye/container';

import {
  Application,
  HookCollector,
  HookContainer,
  HookFactory,
  HttpAdapterHost,
  LoggerHost,
  NotchModule,
} from '../..';

describe('ExpressModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new NotchModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: HttpAdapterHost.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: LoggerHost.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: HookContainer.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: HookFactory.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: HookCollector.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: Application.name }),
      ]),
    );
  });
});
