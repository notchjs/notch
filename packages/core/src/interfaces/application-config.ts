import type { TlsOptions } from 'node:tls';

import type { ShutdownOptions } from './shutdown-options';

export interface ApplicationConfig {
  tls?: TlsOptions;
  shutdown?: ShutdownOptions;
}
