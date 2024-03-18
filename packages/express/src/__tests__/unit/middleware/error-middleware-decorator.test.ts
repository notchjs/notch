import { ErrorMiddlewareDecorator } from '../../..';

test('should produce response when process call', () => {
  const middleware = (err: any, req: any, res: any, next: any): string => 'foo';
  const decorator = new ErrorMiddlewareDecorator(middleware);
  expect(decorator.process(jest.fn(), jest.fn(), jest.fn(), jest.fn())).toEqual(
    'foo',
  );
});
