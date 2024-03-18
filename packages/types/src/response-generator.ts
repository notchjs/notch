export interface ResponseGenerator {
  reply(response: any, body: any, statusCode?: number): any;
}
