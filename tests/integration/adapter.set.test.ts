import { Needle } from '@hemjs/needle';
import { expect } from 'chai';
import * as express from 'express';

import { HttpAdapter, NotchModule } from '../../src';

describe('.set()', () => {
  let adapter: HttpAdapter;
  let instance: express.Application;

  beforeEach(() => {
    const providers = new NotchModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<HttpAdapter>(HttpAdapter.name);
    instance = adapter.getInstance();
  });

  describe('.set()', () => {
    it('should set a value', () => {
      adapter.set('pury', 'pury');
      expect(instance.get('pury')).to.equal('pury');
    });
  });

  describe('.enable()', () => {
    it('should set the value to true', () => {
      adapter.enable('pury');
      expect(instance.get('pury')).to.be.true;
    });
  });

  describe('.disable()', () => {
    it('should set the value to false', () => {
      adapter.disable('pury');
      expect(instance.get('pury')).to.be.false;
    });
  });
});
