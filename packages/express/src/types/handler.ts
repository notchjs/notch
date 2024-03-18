import type { Type } from '@armscye/core';
import type { NotchHandler, NotchMiddleware } from '@notchjs/types';
import type { ErrorRequestHandler, RequestHandler } from 'express';

export type Handler =
  | NotchHandler
  | NotchMiddleware
  | ErrorRequestHandler
  | RequestHandler
  | Type<any>
  | Function
  | object
  | string
  | Symbol;

export type HandlerArgument = Handler | Handler[];
