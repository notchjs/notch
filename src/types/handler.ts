import type { Type } from '@armscye/core';
import type { NotchHandler } from '@armscye/handler';
import type { NotchMiddleware } from '@armscye/middleware';
import type { ErrorRequestHandler, RequestHandler } from 'express';

export type Handler =
  | NotchHandler
  | NotchMiddleware
  | ErrorRequestHandler
  | RequestHandler
  | Type<any>
  | Function
  | string
  | Symbol;

export type HandlerArgument = Handler | Handler[];
