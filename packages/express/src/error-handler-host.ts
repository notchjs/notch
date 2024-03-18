import type { NotchMiddleware } from '@notchjs/types';

export class ErrorHandlerHost {
  private _errorHandler: NotchMiddleware | undefined;

  constructor(errorHandler?: NotchMiddleware) {
    this._errorHandler = errorHandler;
  }

  get errorHandler(): NotchMiddleware | undefined {
    return this._errorHandler;
  }
}
