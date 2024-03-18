import { MiddlewareContainer, NotchHandlerMiddleware } from '../..';
import { NormalHandler } from './fixtures/normal-handler';
import { NormalMiddleware } from './fixtures/normal-middleware';
import { InMemoryContainer } from './in-memory-container';

describe('MiddlewareContainer', () => {
  let originContainer: InMemoryContainer;
  let container: MiddlewareContainer;

  beforeEach(() => {
    originContainer = new InMemoryContainer();
    container = new MiddlewareContainer(originContainer);
  });

  afterEach(() => {
    originContainer.reset();
  });

  it('should return true when original container has service', async () => {
    originContainer.set('service', new Date());
    expect(container.has('service')).toBeTruthy();
  });

  it('should return false when original container has no service', async () => {
    expect(container.has('not-a-callable')).toBeFalsy();
  });

  it('should throw when service unknown', async () => {
    expect(() => container.get('not-a-service')).toThrow();
  });

  it('should throw when service does not define `process` method', async () => {
    originContainer.set('middleware', new Date());
    expect(() => container.get('middleware')).toThrow();
  });

  it('should throw when callable does not define `process` method', async () => {
    expect(() => container.get(jest.fn() as any)).toThrow();
  });

  it('should decorate handler as middleware', async () => {
    originContainer.set('handler-service', new NormalHandler());
    expect(container.get('handler-service')).toEqual(
      new NotchHandlerMiddleware(new NormalHandler()),
    );
  });

  it('should return service from original container', async () => {
    originContainer.set('middleware-service', new NormalMiddleware());
    expect(container.get('middleware-service')).toBeInstanceOf(
      NormalMiddleware,
    );
  });
});
