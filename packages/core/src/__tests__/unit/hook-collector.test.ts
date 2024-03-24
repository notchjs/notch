import { HookCollector } from '../..';
import { HookContainer } from '../..';
import { HookFactory } from '../..';
import { NoopHook } from './fixtures/noop-hook';
import { OnShutdownHook } from './fixtures/on-shutdown-hook';
import { OnStartupHook } from './fixtures/on-startup-hook';
import { InMemoryContainer } from './in-memory-container';

describe('HookCollector', () => {
  let originContainer: InMemoryContainer;
  let factory: HookFactory;
  let noopHook: NoopHook;

  beforeEach(() => {
    originContainer = new InMemoryContainer();
    const container = new HookContainer(originContainer);
    factory = new HookFactory(container);
    noopHook = new NoopHook();
  });

  afterEach(() => {
    originContainer.reset();
  });

  it('should create an instance of HookCollector', () => {
    const hookCollector = new HookCollector(factory);
    expect(hookCollector).toBeInstanceOf(HookCollector);
  });

  it('should call "startup" hook', async () => {
    const hook = new OnStartupHook();
    const hookSpy = jest.spyOn(hook, 'onStartup');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onStartup();
    expect(hookSpy).toHaveBeenCalled();
    expect(hookSpy).toHaveBeenCalledWith();
  });

  it('should call "onShutdown" hook', async () => {
    const hook = new OnShutdownHook();
    const hookSpy = jest.spyOn(hook, 'onShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onShutdown();
    expect(hookSpy).toHaveBeenCalled();
  });

  it('should call "onShutdown" hook with signal', async () => {
    const hook = new OnShutdownHook();
    const hookSpy = jest.spyOn(hook, 'onShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onShutdown('SIGTERM');
    expect(hookSpy).toHaveBeenCalled();
    expect(hookSpy).toHaveBeenCalledWith('SIGTERM');
  });
});
