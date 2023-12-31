import type { Container, Provider } from '@armscye/container';
import type { Logger } from '@armscye/logging';
import { NotchMiddleware } from '@armscye/middleware';
import type { Module } from '@armscye/module';
import { ResponseGenerator } from '@armscye/response';
import * as express from 'express';

import { Application } from './application';
import { ERROR_HANDLER, ERROR_RESPONSE_GENERATOR, LOGGER } from './constants';
import { ErrorHandlerHost } from './error-handler-host';
import { ErrorResponseGeneratorHost } from './error-response-generator-host';
import { NotFoundHandler } from './handler';
import { HttpAdapter } from './http-adapter';
import { NoopLogger } from './logger';
import { LoggerHost } from './logger-host';
import { ErrorHandler } from './middleware';
import { MiddlewareContainer } from './middleware-container';
import { MiddlewareFactory } from './middleware-factory';
import { MiddlewareProxy } from './middleware-proxy';
import { ErrorResponseGenerator } from './response';

export class NotchModule implements Module {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: NotFoundHandler.name,
          useClass: NotFoundHandler,
        },
        {
          provide: ErrorResponseGenerator.name,
          useClass: ErrorResponseGenerator,
        },

        {
          provide: ErrorResponseGeneratorHost.name,
          useFactory: (container: Container) => {
            const generator = container.has(ERROR_RESPONSE_GENERATOR)
              ? container.get<ResponseGenerator>(ERROR_RESPONSE_GENERATOR)
              : container.get<ResponseGenerator>(ErrorResponseGenerator.name);

            return new ErrorResponseGeneratorHost(generator);
          },
        },
        {
          provide: ErrorHandler.name,
          useFactory: (container: Container) => {
            const generatorHost = container.get<ErrorResponseGeneratorHost>(
              ErrorResponseGeneratorHost.name,
            );

            return new ErrorHandler(generatorHost.getResponseGenerator());
          },
        },

        {
          provide: ErrorHandlerHost.name,
          useFactory: (container: Container) => {
            const errorHandler = container.has(ERROR_HANDLER)
              ? container.get<NotchMiddleware>(ERROR_HANDLER)
              : undefined;

            return new ErrorHandlerHost(errorHandler);
          },
        },
        {
          provide: MiddlewareContainer.name,
          useFactory: (container: Container) => {
            return new MiddlewareContainer(container);
          },
        },
        {
          provide: MiddlewareFactory.name,
          useFactory: (container: Container) => {
            return new MiddlewareFactory(
              container.get<MiddlewareContainer>(MiddlewareContainer.name),
            );
          },
        },
        {
          provide: MiddlewareProxy.name,
          useFactory: (container: Container) => {
            const errorHandlerHost = container.get<ErrorHandlerHost>(
              ErrorHandlerHost.name,
            );

            return new MiddlewareProxy(
              container.get<MiddlewareFactory>(MiddlewareFactory.name),
              errorHandlerHost.getErrorHandler(),
            );
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
          provide: HttpAdapter.name,
          useFactory: (container: Container) => {
            return new HttpAdapter(
              express(),
              container.get<MiddlewareProxy>(MiddlewareProxy.name),
            );
          },
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
