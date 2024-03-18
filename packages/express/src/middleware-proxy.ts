import type { NotchMiddleware } from '@notchjs/types';

import type { MiddlewareFactory } from './middleware-factory';
import type { HandlerArgument } from './types';

export class MiddlewareProxy {
  private readonly factory: MiddlewareFactory;
  private readonly errorHandler?: NotchMiddleware;

  constructor(factory: MiddlewareFactory, errorHandler?: NotchMiddleware) {
    this.factory = factory;
    this.errorHandler = errorHandler;
  }

  public bindHandler(handler: HandlerArgument) {
    let middleware = this.factory.prepare(handler);
    if (!Array.isArray(middleware)) {
      middleware = [middleware];
    }
    return middleware.map((mid: any) => {
      const instance = mid.process.bind(mid);
      if (this.errorHandler) {
        return this.createProxy(instance, this.errorHandler);
      }
      return instance;
    });
  }

  public createProxy(
    targetCallback: <TRequest, TResponse>(
      req?: TRequest,
      res?: TResponse,
      next?: () => void,
    ) => void,
    errorHandler: NotchMiddleware,
  ) {
    return async <TRequest, TResponse>(
      req: TRequest,
      res: TResponse,
      next?: () => void,
    ) => {
      try {
        await targetCallback(req, res, next);
      } catch (err) {
        errorHandler.process(err, req, res, next);
      }
    };
  }
}
