export interface NotchHandler<TRequest = any, TResponse = any> {
  handle(req: TRequest, res: TResponse, next?: any): any;
}
