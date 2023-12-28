import type { TlsOptions } from 'tls';

import type { ShutdownOptions } from './shutdown-options';

export interface HttpServerOptions {
  /**
   * The TLS configuration.
   */
  tls?: TlsOptions;

  /**
   * Graceful shutdown configuration.
   */
  shutdown?: Pick<ShutdownOptions, 'graceful' | 'grace'>;
}
