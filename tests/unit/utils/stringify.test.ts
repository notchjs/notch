import { expect } from 'chai';

import { stringify } from '../../../src/utils/stringify';

function foo() {}

describe('stringify', () => {
  it('should return string when given null', () => {
    expect(stringify(null)).to.equal('null');
  });

  it('should return string when given undefined', () => {
    expect(stringify(undefined)).to.equal('undefined');
  });

  it('should return string when given boolean true', () => {
    expect(stringify(true)).to.equal('true');
  });

  it('should return string when given boolean false', () => {
    expect(stringify(false)).to.equal('false');
  });

  it('should return same string when given string', () => {
    expect(stringify('abc')).to.equal('abc');
  });

  it('should return string when given symbol', () => {
    expect(stringify(Symbol('abc'))).to.equal('Symbol(abc)');
  });

  it('should return string when given function', () => {
    expect(stringify(foo)).to.equal('foo');
  });

  it('should return string when given class', () => {
    expect(stringify(Date)).to.equal('Date');
  });

  it('should return string when given number', () => {
    expect(stringify(123)).to.equal('123');
  });
});
