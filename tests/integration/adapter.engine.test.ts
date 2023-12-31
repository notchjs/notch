import { Needle } from '@hemjs/needle';
import { expect } from 'chai';
import { readFile } from 'fs';
import { join } from 'path';

import { HttpAdapter, NotchModule } from '../../src';

function render(path: any, options: any, fn: any) {
  readFile(path, 'utf8', (err: any, str: any) => {
    if (err) return fn(err);
    str = str.replace('{{user.name}}', options.user.name);
    fn(null, str);
  });
}

describe('.engine()', () => {
  let adapter: HttpAdapter;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    adapter.setBaseViewsDir(join(__dirname, '/fixtures'));
    adapter.setViewEngine('html');
    adapter.engine('.html', render);
    adapter.setLocal('user', { name: 'pury' });
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should map a template engine', () => {
    adapter.getInstance().render('user.html', (err: any, str: any) => {
      if (err) return;
      expect(str).to.equal('<p>pury</p>');
    });
  });
});
