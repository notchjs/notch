import type { NotchHandler } from '@notchjs/types';

import { NotFoundHandler } from '../../..';

describe('NotFoundHandler', () => {
  let handler: NotchHandler;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let sendSpy: jest.SpyInstance;
  let response: any;
  let request: any;

  beforeEach(() => {
    handler = new NotFoundHandler();
    statusSpy = jest.fn();
    jsonSpy = jest.fn();
    sendSpy = jest.fn();
    response = {
      status: statusSpy,
      json: jsonSpy,
      send: sendSpy,
    };
    response.status.mockReturnValue(response);
    response.json.mockReturnValue(response);
    response.send.mockReturnValue(response);
    request = (method: string, url: string) => ({
      method: method,
      url: url,
    });
  });

  it('should respond with error message when GET request', () => {
    handler.handle(request('GET', '/foo'), response);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith('Cannot GET /foo');
  });

  it('should respond with error message when POST request', () => {
    handler.handle(request('POST', '/foo'), response);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith('Cannot POST /foo');
  });

  it('should respond with error message when OPTIONS request', () => {
    handler.handle(request('OPTIONS', '/foo'), response);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith('Cannot OPTIONS /foo');
  });
});
