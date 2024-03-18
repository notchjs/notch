import type { TlsOptions } from 'node:tls';

import { ShutdownOptions } from './shutdown-options';

export interface AdapterConfig {
  tls?: TlsOptions;
  shutdown?: ShutdownOptions;
}
