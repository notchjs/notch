import type { ResponseGenerator } from '@notchjs/types';

export class ErrorResponseGeneratorHost {
  private _responseGenerator: ResponseGenerator | undefined;

  constructor(responseGenerator?: ResponseGenerator) {
    this._responseGenerator = responseGenerator;
  }

  get responseGenerator(): ResponseGenerator | undefined {
    return this._responseGenerator;
  }
}
