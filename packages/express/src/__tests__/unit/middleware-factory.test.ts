import {
  ErrorMiddlewareDecorator,
  MiddlewareContainer,
  MiddlewareDecorator,
  MiddlewareFactory,
  NotchHandlerMiddleware,
} from '../..';
import { NoopMiddleware } from './fixtures/noop-middleware';
import { NormalHandler } from './fixtures/normal-handler';
import { NormalMiddleware } from './fixtures/normal-middleware';
import { InMemoryContainer } from './in-memory-container';

describe('MiddlewareFactory', () => {
  let originContainer: InMemoryContainer;
  let container: MiddlewareContainer;
  let factory: MiddlewareFactory;

  beforeEach(() => {
    originContainer = new InMemoryContainer();
    container = new MiddlewareContainer(originContainer);
    factory = new MiddlewareFactory(container);
  });

  afterEach(() => {
    originContainer.reset();
  });

  it('should prepare middleware instance verbatim', () => {
    const middleware = new NormalMiddleware();
    expect(factory.prepare(middleware)).toEqual(middleware);
  });

  it('should prepare middleware class as middleware', () => {
    const middleware = factory.prepare(NormalMiddleware);
    expect(middleware).toBeInstanceOf(NormalMiddleware);
  });

  it('should prepare handler as middleware', () => {
    const handler = new NormalHandler();
    const middleware = factory.prepare(handler);
    expect(middleware).toEqual(new NotchHandlerMiddleware(handler));
  });

  it('should decorate handler as middleware', () => {
    const handler = new NormalHandler();
    const middleware = factory.handler(handler);
    expect(middleware).toEqual(new NotchHandlerMiddleware(handler));
  });

  it('should prepare handler class as middleware', () => {
    const middleware = factory.prepare(NormalHandler);
    expect(middleware).toEqual(factory.handler(new NormalHandler()));
  });

  it('should prepare callable as middleware', () => {
    const callable = (req: any, res: any): void => {};
    const middleware = factory.prepare(callable);
    expect(middleware).toEqual(new MiddlewareDecorator(callable));
  });

  it('should decorate callable as middleware', () => {
    const callable = (req: any, res: any): void => {};
    const middleware = factory.callable(callable);
    expect(middleware).toEqual(new MiddlewareDecorator(callable));
  });

  it('should prepare callable as middleware (error)', () => {
    const callable = (err: any, req: any, res: any, next: any): void => {};
    const middleware = factory.prepare(callable);
    expect(middleware).toEqual(new ErrorMiddlewareDecorator(callable));
  });

  it('should decorate callable as middleware (error)', () => {
    const callable = (err: any, req: any, res: any, next: any): void => {};
    const middleware = factory.callable(callable);
    expect(middleware).toEqual(new ErrorMiddlewareDecorator(callable));
  });

  it('should prepare array middleware as middleware array', () => {
    const middleware1 = new NormalMiddleware();
    const middleware2 = new NormalMiddleware();
    const middleware = factory.prepare([middleware1, middleware2]);
    expect(middleware).toEqual([middleware1, middleware2]);
  });

  it('should pipeline array middleware as middleware array', () => {
    const middleware1 = new NormalMiddleware();
    const middleware2 = new NormalMiddleware();
    const middleware = factory.pipeline([middleware1, middleware2]);
    expect(middleware).toEqual([middleware1, middleware2]);
  });

  it('should lazy prepare middleware when string', () => {
    const token = 'middleware-service';
    const middleware = new NormalMiddleware();
    originContainer.set(token, middleware);
    expect(factory.prepare(token)).toEqual(
      container.get<NormalMiddleware>(token),
    );
  });

  it('should lazy prepare middleware when symbol', () => {
    const token = Symbol('middleware-service');
    const middleware = new NormalMiddleware();
    originContainer.set(token, middleware);
    expect(factory.prepare(token)).toEqual(
      container.get<NormalMiddleware>(token),
    );
  });

  it('should lazy prepare middleware when string array', () => {
    const token1 = 'middleware-service1';
    const middleware1 = new NormalMiddleware();
    const token2 = 'middleware-service2';
    const middleware2 = new NormalMiddleware();
    originContainer.set(token1, middleware1);
    originContainer.set(token2, middleware2);
    expect(factory.prepare([token1, token2])).toEqual([
      container.get<NormalMiddleware>(token1),
      container.get<NormalMiddleware>(token2),
    ]);
  });

  it('should reject noop class as middleware', () => {
    expect(() => factory.prepare(NoopMiddleware)).toThrow();
  });

  it('should reject number as middleware', () => {
    expect(() => factory.prepare(42)).toThrow();
  });

  it('should reject null as middleware', () => {
    expect(() => factory.prepare(null)).toThrow();
  });

  it('should reject Date as middleware', () => {
    expect(() => factory.prepare(new Date())).toThrow();
  });

  it('should reject boolean as middleware', () => {
    expect(() => factory.prepare(false)).toThrow();
  });
});
