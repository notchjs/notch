import type { Container, Provider } from '@armscye/container';
import type { Logger } from '@armscye/logging';
import type { Module } from '@armscye/module';
import * as express from 'express';

import { Application } from './application';
import { LOGGER } from './constants';
import { HttpAdapter } from './http-adapter';
import { NoopLogger } from './logger';
import { LoggerHost } from './logger-host';

export class NotchModule implements Module {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: LoggerHost.name,
          useFactory: (container: Container) => {
            const logger = container.has(LOGGER)
              ? container.get<Logger>(LOGGER)
              : new NoopLogger();

            return new LoggerHost(logger);
          },
        },
        {
          provide: HttpAdapter.name,
          useFactory: (container: Container) => new HttpAdapter(express()),
        },
        {
          provide: Application.name,
          useFactory: (container: Container) => {
            const config = container.has('config')
              ? container.get<any>('config')
              : {};
            const loggerHost = container.get<LoggerHost>(LoggerHost.name);
            const httpAdapter = container.get<HttpAdapter>(HttpAdapter.name);

            return new Application(httpAdapter, {
              log: loggerHost.getLogger(Application.name),
              config: config.notch,
            });
          },
        },
      ],
    };
  }
}
