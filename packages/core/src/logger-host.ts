import type { Logger } from '@armscye/logging';

export class LoggerHost {
  private _logger: Logger;

  constructor(logger: Logger) {
    this._logger = logger;
  }

  get logger(): Logger {
    return this._logger;
  }
}
