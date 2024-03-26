import type { HttpAdapter } from '@notchjs/types';

export class HttpAdapterHost {
  private _httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this._httpAdapter = httpAdapter;
  }

  get httpAdapter(): HttpAdapter {
    return this._httpAdapter;
  }
}
