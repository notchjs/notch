import { Needle } from '@hemjs/needle';
import * as express from 'express';

import { ExpressAdapter, ExpressModule } from '../..';

describe('config', () => {
  let adapter: ExpressAdapter;
  let instance: express.Application;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    instance = adapter.getInstance();
  });

  describe('.set()', () => {
    it('should set a value', () => {
      adapter.set('pury', 'pury');
      expect(instance.get('pury')).toEqual('pury');
    });
  });

  describe('.enable()', () => {
    it('should set the value to true', () => {
      adapter.enable('pury');
      expect(instance.get('pury')).toBeTruthy();
    });
  });

  describe('.disable()', () => {
    it('should set the value to false', () => {
      adapter.disable('pury');
      expect(instance.get('pury')).toBeFalsy();
    });
  });
});
