import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '@notchjs/express';

import { Application, HTTP_ADAPTER, NotchModule } from '../../..';

describe('Adapter (Express)', () => {
  let container: Needle;

  beforeEach(() => {
    container = new Needle([
      ...(new NotchModule().register()?.['providers'] ?? []),
      ...(new ExpressModule().register()?.['providers'] ?? []),
    ]);
  });

  test('should return when http adapter present', () => {
    container.addProvider({
      provide: HTTP_ADAPTER,
      useExisting: ExpressAdapter.name,
    });
    const app = container.get<Application>(Application.name);
    expect(app).toBeInstanceOf(Application);
    expect(app.getHttpAdapter()).toBeInstanceOf(ExpressAdapter);
  });

  test('should reject if missing http adapter', async () => {
    expect(() => container.get<Application>(Application.name)).toThrow(
      'HTTP adapter not found.',
    );
  });
});
