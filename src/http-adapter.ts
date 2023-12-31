import { isEmpty } from '@hemjs/notions';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as stoppable from 'stoppable';

import type { HttpServerOptions, ServeStaticOptions } from './interfaces';
import type { MiddlewareProxy } from './middleware-proxy';
import type { HandlerArgument, PathArgument } from './types';

export class HttpAdapter {
  protected httpServer: http.Server | https.Server;
  private _stoppable: stoppable.StoppableServer;

  constructor(
    private readonly instance: express.Application,
    private readonly proxy: MiddlewareProxy,
  ) {}

  public use(...args: any[]) {
    return this.instance.use(...args);
  }

  public pipe(
    handlerOrPath: PathArgument | HandlerArgument,
    handler?: HandlerArgument,
  ) {
    handler = handler ?? (handlerOrPath as HandlerArgument);
    const path = handler === handlerOrPath ? '/' : handlerOrPath;
    return this.use(path, this.proxy.bindHandler(handler));
  }

  public get(path: PathArgument, handler: HandlerArgument) {
    return this.instance.get(path, this.proxy.bindHandler(handler));
  }

  public post(path: PathArgument, handler: HandlerArgument) {
    return this.instance.post(path, this.proxy.bindHandler(handler));
  }

  public head(path: PathArgument, handler: HandlerArgument) {
    return this.instance.head(path, this.proxy.bindHandler(handler));
  }

  public delete(path: PathArgument, handler: HandlerArgument) {
    return this.instance.delete(path, this.proxy.bindHandler(handler));
  }

  public put(path: PathArgument, handler: HandlerArgument) {
    return this.instance.put(path, this.proxy.bindHandler(handler));
  }

  public patch(path: PathArgument, handler: HandlerArgument) {
    return this.instance.patch(path, this.proxy.bindHandler(handler));
  }

  public all(path: PathArgument, handler: HandlerArgument) {
    return this.instance.all(path, this.proxy.bindHandler(handler));
  }

  public options(path: PathArgument, handler: HandlerArgument) {
    return this.instance.options(path, this.proxy.bindHandler(handler));
  }

  public setErrorHandler(
    handlerOrPath: PathArgument | HandlerArgument,
    handler?: HandlerArgument,
  ) {
    return this.pipe(handlerOrPath, handler);
  }

  public setNotFoundHandler(
    handlerOrPath: PathArgument | HandlerArgument,
    handler?: HandlerArgument,
  ) {
    return this.pipe(handlerOrPath, handler);
  }

  public getInstance() {
    return this.instance;
  }

  public getHttpServer() {
    return this.httpServer;
  }

  public listen(
    port: string | number,
    callback?: () => void,
  ): http.Server | https.Server;
  public listen(
    port: string | number,
    hostname: string,
    callback?: () => void,
  ): http.Server | https.Server;
  public listen(port: any, ...args: any[]): http.Server | https.Server {
    return this.httpServer.listen(port, ...args);
  }

  public initHttpServer(options: HttpServerOptions = {}): void {
    if (!isEmpty(options.tls)) {
      this.httpServer = https.createServer(options.tls, this.getInstance());
    } else {
      this.httpServer = http.createServer(this.getInstance());
    }

    if (options.shutdown?.graceful === true) {
      this._stoppable = stoppable(this.httpServer, options.shutdown?.grace);
    }
  }

  public close() {
    if (!this.httpServer) {
      return undefined;
    }

    if (this._stoppable) {
      return new Promise((resolve) => this._stoppable.stop(resolve));
    }

    return new Promise((resolve) => this.httpServer.close(resolve));
  }

  public set(setting: string, val: any) {
    return this.instance.set(setting, val);
  }

  public enable(setting: string) {
    return this.instance.enable(setting);
  }

  public disable(setting: string) {
    return this.instance.disable(setting);
  }

  public engine(
    ext: string,
    fn: (
      path: string,
      options: object,
      callback: (e: any, rendered?: string) => void,
    ) => void,
  ) {
    return this.instance.engine(ext, fn);
  }

  public useStaticAssets(path: string, options: ServeStaticOptions) {
    if (options && options.prefix) {
      return this.use(options.prefix, express.static(path, options));
    }
    return this.use(express.static(path, options));
  }

  public setBaseViewsDir(path: string | string[]) {
    return this.set('views', path);
  }

  public setViewEngine(engine: string) {
    return this.set('view engine', engine);
  }

  public setLocal(key: string, value: any) {
    this.instance.locals[key] = value;
    return this;
  }
}
