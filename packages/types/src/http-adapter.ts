export interface HttpAdapter {
  getInstance(): any;
  getHttpServer(): any;
  getName(): string;
  listen(port: number | string, callback?: () => void): any;
  listen(port: number | string, hostname: string, callback?: () => void): any;
  initHttpServer(): void;
  close(): any;
}
