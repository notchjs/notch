export interface NotchMiddleware<TRequest = any, TResponse = any> {
  process(req: TRequest, res: TResponse, next?: any): any;
  process(err: any, req: TRequest, res: TResponse, next?: any): any;
}
