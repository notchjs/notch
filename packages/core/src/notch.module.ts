import type { Container, Provider } from '@armscye/container';
import type { Logger } from '@armscye/logging';
import type { Module } from '@armscye/module';
import type { HttpAdapter } from '@notchjs/types';
import { NoopLogger } from '@notchjs/util';

import { Application } from './application';
import { HTTP_ADAPTER, LOGGER } from './constants';
import { HookCollector } from './hook-collector';
import { HookContainer } from './hook-container';
import { HookFactory } from './hook-factory';
import { HttpAdapterHost } from './http-adapter-host';
import { LoggerHost } from './logger-host';

export class NotchModule implements Module {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: HttpAdapterHost.name,
          useFactory: (container: Container) => {
            const httpAdapter = container.has(HTTP_ADAPTER)
              ? container.get<HttpAdapter>(HTTP_ADAPTER)
              : undefined;

            if (!httpAdapter) {
              throw new Error(
                'HTTP adapter not found. Please register a compatible HTTP adapter with the "HTTP_ADAPTER" token.',
              );
            }

            return new HttpAdapterHost(httpAdapter);
          },
        },
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
          provide: HookContainer.name,
          useFactory: (container: Container) => {
            return new HookContainer(container);
          },
        },
        {
          provide: HookFactory.name,
          useFactory: (container: Container) => {
            return new HookFactory(container.get(HookContainer.name));
          },
        },
        {
          provide: HookCollector.name,
          useFactory: (container: Container) => {
            const config = container.has('config')
              ? container.get<any>('config')
              : {};

            return new HookCollector(
              container.get(HookFactory.name),
              config.hooks,
            );
          },
        },
        {
          provide: Application.name,
          useFactory: (container: Container) => {
            const config = container.has('config')
              ? container.get<any>('config')
              : {};
            const httpAdapterHost = container.get<HttpAdapterHost>(
              HttpAdapterHost.name,
            );
            const loggerHost = container.get<LoggerHost>(LoggerHost.name);
            const hooks = container.get<HookCollector>(HookCollector.name);

            return new Application(httpAdapterHost.httpAdapter, hooks, {
              log: loggerHost.logger,
              config: config.notch,
            });
          },
        },
      ],
    };
  }
}
