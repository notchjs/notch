import { isEmpty } from '@hemjs/notions';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as stoppable from 'stoppable';

import type { HttpServerOptions } from './interfaces';

export class HttpAdapter {
  protected httpServer: http.Server | https.Server;
  private _stoppable: stoppable.StoppableServer;

  constructor(private readonly instance: express.Application) {}

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
}
