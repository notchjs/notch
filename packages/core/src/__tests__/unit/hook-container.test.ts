import { HookContainer } from '../..';
import { OnStartupHook } from './fixtures/on-startup-hook';
import { InMemoryContainer } from './in-memory-container';

describe('HookContainer', () => {
  let container: HookContainer;
  let originContainer: InMemoryContainer;

  beforeEach(async () => {
    originContainer = new InMemoryContainer();
    container = new HookContainer(originContainer);
  });

  afterEach(async () => {
    originContainer.reset();
  });

  it('should return true when original container has service', async () => {
    originContainer.set('service', new Date());
    expect(container.has('service')).toBe(true);
  });

  it('should return false when original container has no service', async () => {
    expect(container.has('not-a-service')).toBe(false);
  });

  it('should return service from original container', async () => {
    originContainer.set('hook-service', new OnStartupHook());
    expect(container.get('hook-service')).toBeInstanceOf(OnStartupHook);
  });

  it('should throw when service unknown', async () => {
    expect(() => container.get('not-a-service')).toThrow();
  });
});
