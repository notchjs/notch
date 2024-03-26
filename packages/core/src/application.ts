import * as http from 'node:http';
import * as https from 'node:https';
import type { AddressInfo } from 'node:net';
import { platform } from 'node:os';

import { isFunction, isString } from '@hemjs/notions';
import type { HttpAdapter } from '@notchjs/types';
import { iterate } from 'iterare';

import type { HookCollector } from './hook-collector';
import type { ApplicationEnvironment } from './interfaces';

export class Application {
  protected httpServer!: http.Server | https.Server;
  private readonly adapter: HttpAdapter;
  private readonly hooks: HookCollector;
  private readonly _environment: ApplicationEnvironment;
  private readonly activeSignals = new Array<NodeJS.Signals | string>();
  private cleanupRef?: (...args: unknown[]) => unknown;
  private isInitialized = false;
  private isListening = false;

  constructor(
    adapter: HttpAdapter,
    hooks: HookCollector,
    environment: ApplicationEnvironment,
  ) {
    this.adapter = adapter;
    this.hooks = hooks;
    this._environment = environment;
    this.registerHttpServer();
  }

  get environment(): ApplicationEnvironment {
    return this._environment;
  }

  public async init(): Promise<this> {
    if (this.isInitialized) {
      return this;
    }

    const startAt = process.hrtime.bigint();
    await this.hooks.onStartup();

    this.isInitialized = true;
    const finishedAt = process.hrtime.bigint();
    const elapsedTime = (Number(finishedAt - startAt) / 1e9).toFixed(3);
    this.environment.log?.info(`Application started in ${elapsedTime} seconds`);
    return this;
  }

  public getHttpAdapter<T extends HttpAdapter = HttpAdapter>(): T {
    return this.adapter as T;
  }

  public getHttpServer(): http.Server | https.Server {
    return this.httpServer;
  }

  public registerHttpServer(): void {
    this.httpServer = this.createServer();
  }

  public createServer<T = any>(): T {
    this.adapter.initHttpServer();
    return this.adapter.getHttpServer() as T;
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

    if (this.environment.config?.shutdown?.enabled === true) {
      this.shutdownOnSignal(this.environment.config?.shutdown?.signals);
    }

    return new Promise((resolve, reject) => {
      const errorHandler = (e: any) => {
        this.environment.log?.error(e?.toString?.());
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
            this.isListening = true;
            resolve(this.httpServer);
          }
          if (isCallbackInOriginalArgs) {
            args[args.length - 1](...originalCallbackArgs);
          }
        },
      );
    });
  }

  public async close(signal?: string): Promise<void> {
    await this.dispose();
    await this.hooks.onShutdown(signal);
    this.unsubscribeFromSignals();
    this.isListening = false;
  }

  public async getUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isListening) {
        this.environment.log?.error(
          'app.listen() must be called before app.getUrl()',
        );
        reject('Server not listening!');
        return;
      }
      const address = this.httpServer.address();
      resolve(this.formatAddress(address));
    });
  }

  protected shutdownOnSignal(signals: (NodeJS.Signals | string)[] = []): void {
    signals = iterate(Array.from(new Set(['SIGTERM', ...signals])))
      .map((signal) => signal.toString().toUpperCase().trim())
      .filter((signal) => !this.activeSignals.includes(signal))
      .toArray();
    this.listenToSignals(signals as NodeJS.Signals[]);
  }

  protected listenToSignals(signals: NodeJS.Signals[]): void {
    let receivedSignal = false;
    const doCleanup = async (signal: NodeJS.Signals) => {
      try {
        if (receivedSignal) {
          return;
        }
        receivedSignal = true;
        this.environment.log?.info(`Received ${signal}. Shutdown initiated...`);
        await this.dispose();
        await this.hooks.onShutdown(signal);
        signals.forEach((sig) => process.removeListener(sig, doCleanup));
        process.kill(process.pid, signal);
      } catch (err: any) {
        this.environment.log?.error(`Error during shutdown: ${err.stack!}`);
        process.exit(1);
      }
    };
    this.cleanupRef = doCleanup as (...args: unknown[]) => unknown;
    signals.forEach((signal) => {
      this.activeSignals.push(signal);
      process.on(signal as any, doCleanup);
    });
  }

  protected unsubscribeFromSignals(): void {
    if (!this.cleanupRef) {
      return;
    }
    this.activeSignals.forEach((signal) => {
      process.removeListener(signal, this.cleanupRef!);
    });
  }

  protected async dispose(): Promise<void> {
    this.adapter && (await this.adapter.close());
  }

  private formatAddress(address: AddressInfo | string | null): string {
    if (isString(address)) {
      if (platform() === 'win32') {
        return address;
      }
      const basePath = encodeURIComponent(address);
      return `${this.getProtocol()}+unix://${basePath}`;
    }
    let host = (address as AddressInfo).address;
    if ([6, 'IPv6'].includes((address as AddressInfo).family)) {
      if (host === '::') {
        host = '[::1]';
      } else {
        host = `[${host}]`;
      }
    } else if (host === '0.0.0.0') {
      host = '127.0.0.1';
    }
    return `${this.getProtocol()}://${host}:${(address as AddressInfo).port}`;
  }

  private getProtocol(): 'http' | 'https' {
    return this.environment.config?.tls ? 'https' : 'http';
  }
}
