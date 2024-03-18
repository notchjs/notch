import type { Logger } from '@armscye/logging';

export class LoggerHost {
  private _logger: Logger | undefined;

  constructor(logger?: Logger) {
    this._logger = logger;
  }

  get logger(): Logger | undefined {
    return this._logger;
  }
}
