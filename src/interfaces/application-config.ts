import type { TlsOptions } from 'tls';

import type { ShutdownOptions } from './shutdown-options';

export interface ApplicationConfig {
  /**
   * The TLS configuration
   */
  tls?: TlsOptions;

  /**
   *  Shutdown configuration
   */
  shutdown?: ShutdownOptions;
}
