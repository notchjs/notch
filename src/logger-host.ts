import type { Logger } from '@armscye/logging';

export class LoggerHost {
  constructor(private readonly logger: Logger) {}

  getLogger(name?: string): Logger {
    return this.logger.getLogger(name);
  }
}
