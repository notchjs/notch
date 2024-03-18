import { NotchHandlerMiddleware } from '../../..';
import { NormalHandler } from '../fixtures/normal-handler';

test('should produce response when process call', () => {
  const middleware = new NotchHandlerMiddleware(new NormalHandler());
  expect(middleware.process(jest.fn(), jest.fn(), jest.fn())).toEqual('foo');
});
