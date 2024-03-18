import { stringify } from '..';

describe('stringify', () => {
  it('should handle strings correctly', () => {
    const testString = 'hello world';
    expect(stringify(testString)).toBe(testString);
  });

  it('should handle null', () => {
    expect(stringify(null)).toBe('null');
  });

  it('should handle undefined', () => {
    expect(stringify(undefined)).toBe('undefined');
  });

  it('should handle objects with a name property', () => {
    const testObject = { name: 'My Object' };
    expect(stringify(testObject)).toBe('My Object');
  });

  it('should handle objects without a name property by calling toString', () => {
    const testObject = { value: 123 };
    expect(stringify(testObject)).toBe(testObject.toString());
  });

  it('should handle numbers', () => {
    const testNumber = 42;
    expect(stringify(testNumber)).toBe('42');
  });

  it('should handle booleans', () => {
    expect(stringify(true)).toBe('true');
    expect(stringify(false)).toBe('false');
  });

  it('should handle functions', () => {
    const testObject = function foo() {};
    expect(stringify(testObject)).toBe('foo');
  });

  it('should handle classes', () => {
    const testObject = Date;
    expect(stringify(testObject)).toBe('Date');
  });
});
