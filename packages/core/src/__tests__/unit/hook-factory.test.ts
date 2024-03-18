import { HookContainer, HookFactory, HookRecord } from '../..';
import { OnStartupHook } from './fixtures/on-startup-hook';
import { InMemoryContainer } from './in-memory-container';

describe('HookFactory', () => {
  let container: HookContainer;
  let originContainer: InMemoryContainer;
  let factory: HookFactory;

  beforeEach(async () => {
    originContainer = new InMemoryContainer();
    container = new HookContainer(originContainer);
    factory = new HookFactory(container);
  });

  afterEach(async () => {
    originContainer.reset();
  });

  it('should prepare hook verbatim when class instance ', () => {
    const hook = new OnStartupHook();
    expect(factory.prepare(hook)).toEqual({
      name: 'OnStartupHook',
      hook: hook,
    });
  });

  it('should prepare hook when class', () => {
    const record = factory.prepare(OnStartupHook) as HookRecord;
    expect(record.hook).toBeInstanceOf(OnStartupHook);
  });

  it('should prepare hook when function', () => {
    const fnHook = () => {};
    const record = factory.prepare(fnHook) as HookRecord;
    expect(record.hook).toEqual(fnHook());
  });

  it('should prepare hooks when object array', () => {
    const hook1 = new OnStartupHook();
    const hook2 = new OnStartupHook();
    const hook = factory.prepare([hook1, hook2]);
    expect(hook).toEqual([
      { name: 'OnStartupHook', hook: hook1 },
      { name: 'OnStartupHook', hook: hook2 },
    ]);
  });

  it('should lazy prepare hook when string', () => {
    const token = 'hook-service';
    const hook = new OnStartupHook();
    originContainer.set(token, hook);
    expect(factory.prepare(token)).toEqual({
      name: 'hook-service',
      hook: hook,
    });
  });

  it('should lazy prepare hook when symbol', () => {
    const token = Symbol('hook-service');
    const hook = new OnStartupHook();
    originContainer.set(token, hook);
    expect(factory.prepare(token)).toEqual({
      name: token.toString(),
      hook: hook,
    });
  });

  it('should lazy prepare hooks when string array', () => {
    const token1 = 'hook-service1';
    const hook1 = new OnStartupHook();
    const token2 = 'hook-service2';
    const hook2 = new OnStartupHook();
    originContainer.set(token1, hook1);
    originContainer.set(token2, hook2);
    expect(factory.prepare([token1, token2])).toEqual([
      { name: 'hook-service1', hook: hook1 },
      { name: 'hook-service2', hook: hook2 },
    ]);
  });

  it('should throw when invalid type', async () => {
    expect(() => factory.prepare(null)).toThrow();
    expect(() => factory.prepare(false)).toThrow();
    expect(() => factory.prepare(123)).toThrow();
  });
});
