import type { HttpAdapter } from '@notchjs/types';

export class HttpAdapterHost {
  private _httpAdapter: HttpAdapter | undefined;

  constructor(httpAdapter?: HttpAdapter) {
    this._httpAdapter = httpAdapter;
  }

  get httpAdapter(): HttpAdapter | undefined {
    return this._httpAdapter;
  }
}
