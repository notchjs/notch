import { isFunction } from '@hemjs/notions';
import * as http from 'http';
import * as https from 'https';

import type { HttpAdapter } from './http-adapter';
import { ApplicationEnvironment } from './interfaces';

export class Application {
  protected httpServer: http.Server | https.Server;
  private isInitialized = false;

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly environment: ApplicationEnvironment,
  ) {
    this.registerHttpServer();
  }

  public async init() {
    if (this.isInitialized) {
      return this;
    }

    this.isInitialized = true;
    return this;
  }

  public getHttpAdapter() {
    return this.httpAdapter;
  }

  public getHttpServer() {
    return this.httpServer;
  }

  public registerHttpServer() {
    this.httpServer = this.createServer();
  }

  public createServer() {
    this.httpAdapter.initHttpServer({
      tls: this.environment.config?.tls,
      shutdown: this.environment.config?.shutdown,
    });
    return this.httpAdapter.getHttpServer();
  }

  public async listen(
    port: string | number,
    callback?: () => void,
  ): Promise<any>;
  public async listen(
    port: string | number,
    hostname: string,
    callback?: () => void,
  ): Promise<any>;
  public async listen(port: any, ...args: any[]): Promise<any> {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const errorHandler = (e: any) => {
        this.environment.log.error(e?.toString?.());
        reject(e);
      };
      this.httpServer.once('error', errorHandler);
      const isCallbackInOriginalArgs = isFunction(args[args.length - 1]);
      const listenFnArgs = isCallbackInOriginalArgs
        ? args.slice(0, args.length - 1)
        : args;
      this.httpServer.listen(
        port,
        ...listenFnArgs,
        (...originalCallbackArgs: unknown[]) => {
          if (originalCallbackArgs[0] instanceof Error) {
            return reject(originalCallbackArgs[0]);
          }
          const address = this.httpServer.address();
          if (address) {
            this.httpServer.removeListener('error', errorHandler);
            resolve(this.httpServer);
          }
          if (isCallbackInOriginalArgs) {
            args[args.length - 1](...originalCallbackArgs);
          }
        },
      );
    });
  }

  public async close(signal?: string) {
    await this.dispose();
  }

  private async dispose() {
    await this.httpAdapter.close();
  }
}
