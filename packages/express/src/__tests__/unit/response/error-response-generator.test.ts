import type { ResponseGenerator } from '@notchjs/types';

import { ErrorResponseGenerator } from '../../..';

describe('DefaultErrorResponseGenerator', () => {
  let generator: ResponseGenerator;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let sendSpy: jest.SpyInstance;
  let response: any;

  beforeEach(() => {
    generator = new ErrorResponseGenerator();
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
  });

  describe('.reply()', () => {
    it('should return empty when nil as body', () => {
      generator.reply(response, null);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith();
    });

    it('should return verbatim when string as body', () => {
      const body = 'Internal server error';
      generator.reply(response, body);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith(body);
    });

    it('should return json when object as body', () => {
      const body = { message: 'Internal server error' };
      generator.reply(response, body);
      expect(jsonSpy).toHaveBeenCalledTimes(1);
      expect(jsonSpy).toHaveBeenCalledWith(body);
    });

    it('should return status code and message when status', () => {
      const body = { statusCode: 500, message: 'Internal server error' };
      generator.reply(response, body, 500);
      expect(jsonSpy).toHaveBeenCalledTimes(1);
      expect(jsonSpy).toHaveBeenCalledWith(body);
    });
  });
});
