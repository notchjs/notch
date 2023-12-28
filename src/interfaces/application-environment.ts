import type { Logger } from '@armscye/logging';

import type { ApplicationConfig } from './application-config';

export interface ApplicationEnvironment {
  /**
   * Instance of [Logger] to be used for logging.
   */
  log?: Logger;

  /**
   * Configuration for the [Application]
   */
  config?: ApplicationConfig;
}
