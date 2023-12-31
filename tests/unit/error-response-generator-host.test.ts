import { expect } from 'chai';

import { ErrorResponseGeneratorHost } from '../../src';
import { NoopErrorResponseGenerator } from './noop-error-response-generator';

describe('ErrorResponseGeneratorHost', () => {
  const responseGenerator = new NoopErrorResponseGenerator();
  const generatorHost = new ErrorResponseGeneratorHost(responseGenerator);

  it('should wrap an instance of ResponseGenerator', () => {
    expect(generatorHost.getResponseGenerator()).to.equal(responseGenerator);
  });
});
