import { spawnSync } from 'child_process';
import { join } from 'path';

describe('signal (Express)', () => {
  it('should trap registered signals', () => {
    const result = spawnSync('ts-node', [
      join(__dirname, './main.ts'),
      'SIGTERM',
    ]);

    expect(result.stdout.toString().trim()).toEqual('onShutdown SIGTERM');
  });

  it('should not trap unregistered signals', () => {
    const result = spawnSync('ts-node', [
      join(__dirname, './main.ts'),
      'SIGHUP',
    ]);

    expect(result.stdout.toString().trim()).toEqual('');
  });
});
