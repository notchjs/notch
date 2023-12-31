import { expect } from 'chai';
import * as sinon from 'sinon';

import { HookCollector, HookContainer, HookFactory } from '../../src';
import { AsyncBeforeShutdownHook } from './fixtures/async-before-shutdown-hook';
import { AsyncOnShutdownHook } from './fixtures/async-on-shutdown-hook';
import { BeforeShutdownHook } from './fixtures/before-shutdown-hook';
import { NoopHook } from './fixtures/noop-hook';
import { OnShutdownHook } from './fixtures/on-shutdown-hook';
import { OnStartupHook } from './fixtures/on-startup-hook';
import { OnStartupHookWithError } from './fixtures/on-startup-hook-with-error';
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

  it('should return instance of HookCollector', () => {
    const hookCollector = new HookCollector(factory);
    expect(hookCollector).to.be.instanceOf(HookCollector);
  });

  it('should call "onStartup" hook', async () => {
    const hook = new OnStartupHook();
    const hookSpy = sinon.spy(hook, 'onStartup');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onStartup();
    expect(hookSpy.called).to.be.true;
    expect(hookSpy.calledWith()).to.be.true;
  });

  it('should call "onStartup" hook with error', async () => {
    const hook = new OnStartupHookWithError();
    const warnSpy = sinon.spy(console, 'warn');
    const hookSpy = sinon.spy(hook, 'onStartup');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    try {
      await hookCollector.onStartup();
    } catch (err) {}
    expect(hookSpy.called).to.be.true;
    expect(warnSpy.called).to.be.true;
    warnSpy.restore();
  });

  it('should call "beforeShutdown" hook', async () => {
    const hook = new BeforeShutdownHook();
    const hookSpy = sinon.spy(hook, 'beforeShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.beforeShutdown();
    expect(hookSpy.called).to.be.true;
  });

  it('should call "beforeShutdown" hook with signal', async () => {
    const hook = new BeforeShutdownHook();
    const hookSpy = sinon.spy(hook, 'beforeShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.beforeShutdown({ signal: 'SIGTERM' });
    expect(hookSpy.called).to.be.true;
    expect(hookSpy.calledWith('SIGTERM')).to.be.true;
  });

  it('should call "beforeShutdown" hook with mercy', async () => {
    const hook = new AsyncBeforeShutdownHook();
    const warnSpy = sinon.spy(console, 'warn');
    const hookSpy = sinon.spy(hook, 'beforeShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    try {
      await hookCollector.beforeShutdown({ mercy: 100 });
    } catch (error) {}

    expect(hookSpy.called).to.be.true;
    expect(warnSpy.called).to.be.true;
    warnSpy.restore();
  });

  it('should call "onShutdown" hook', async () => {
    const hook = new OnShutdownHook();
    const hookSpy = sinon.spy(hook, 'onShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onShutdown();
    expect(hookSpy.called).to.be.true;
  });

  it('should call "onShutdown" hook with signal', async () => {
    const hook = new OnShutdownHook();
    const hookSpy = sinon.spy(hook, 'onShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    await hookCollector.onShutdown({ signal: 'SIGTERM' });
    expect(hookSpy.called).to.be.true;
    expect(hookSpy.calledWith('SIGTERM')).to.be.true;
  });

  it('should call "onShutdown" hook with mercy', async () => {
    const hook = new AsyncOnShutdownHook();
    const warnSpy = sinon.spy(console, 'warn');
    const hookSpy = sinon.spy(hook, 'onShutdown');
    const hookCollector = new HookCollector(factory, [hook, noopHook]);
    try {
      await hookCollector.onShutdown({ mercy: 100 });
    } catch (err) {}
    expect(hookSpy.called).to.be.true;
    expect(warnSpy.called).to.be.true;
    warnSpy.restore();
  });
});
