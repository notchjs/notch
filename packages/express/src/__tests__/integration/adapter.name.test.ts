import { Needle } from '@hemjs/needle';

import { ExpressAdapter, ExpressModule } from '../..';

describe('.getName()', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
  });

  it('should return `Express` as name', () => {
    expect(adapter.getName()).toBe('Express');
  });
});
