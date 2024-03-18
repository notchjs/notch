import type { Logger } from '@armscye/logging';

import type { ApplicationConfig } from './application-config';

export interface ApplicationEnvironment {
  log?: Logger;
  config?: ApplicationConfig;
}
