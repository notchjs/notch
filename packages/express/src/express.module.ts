import type { Container, Provider } from '@armscye/container';
import type { Module } from '@armscye/module';
import type { NotchMiddleware, ResponseGenerator } from '@notchjs/types';
import * as express from 'express';

import { ERROR_HANDLER, ERROR_RESPONSE_GENERATOR } from './constants';
import { ErrorHandlerHost } from './error-handler-host';
import { ErrorResponseGeneratorHost } from './error-response-generator-host';
import { ExpressAdapter } from './express-adapter';
import { NotFoundHandler } from './handler';
import { ErrorHandler } from './middleware';
import { MiddlewareContainer } from './middleware-container';
import { MiddlewareFactory } from './middleware-factory';
import { MiddlewareProxy } from './middleware-proxy';
import { ErrorResponseGenerator } from './response';

export class ExpressModule implements Module {
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
            const responseGenerator = container.has(ERROR_RESPONSE_GENERATOR)
              ? container.get<ResponseGenerator>(ERROR_RESPONSE_GENERATOR)
              : container.get<ResponseGenerator>(ErrorResponseGenerator.name);

            return new ErrorResponseGeneratorHost(responseGenerator);
          },
        },
        {
          provide: ErrorHandler.name,
          useFactory: (container: Container) => {
            const generatorHost = container.get<ErrorResponseGeneratorHost>(
              ErrorResponseGeneratorHost.name,
            );

            return new ErrorHandler(generatorHost.responseGenerator);
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
              errorHandlerHost.errorHandler,
            );
          },
        },
        {
          provide: ExpressAdapter.name,
          useFactory: (container: Container) => {
            const config = container.has('config')
              ? container.get<any>('config')
              : {};
            const proxy = container.get<MiddlewareProxy>(MiddlewareProxy.name);
            return new ExpressAdapter(express(), proxy, {
              config: config.notch,
            });
          },
        },
      ],
    };
  }
}
