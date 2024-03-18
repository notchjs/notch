import { isNil, isObject } from '@hemjs/notions';
import type { ResponseGenerator } from '@notchjs/types';

import { ErrorHandler } from '../../..';
import { CustomError } from '../fixtures/custom-error';
import { NoopErrorResponseGenerator } from '../noop-error-response-generator';

describe('ErrorHandler', () => {
  let generator: ResponseGenerator;
  let errorHandler: ErrorHandler;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let sendSpy: jest.SpyInstance;
  let response: any;

  beforeEach(() => {
    generator = new NoopErrorResponseGenerator();
    errorHandler = new ErrorHandler(generator);
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

  describe('.process()', () => {
    beforeEach(() => {
      jest
        .spyOn(generator, 'reply')
        .mockImplementation(
          (responseRef: any, body: any, statusCode?: number) => {
            if (statusCode) {
              responseRef.status(statusCode);
            }
            if (isNil(body)) {
              return responseRef.send();
            }
            return isObject(body)
              ? responseRef.json(body)
              : responseRef.send(String(body));
          },
        );
    });

    it('should return status code and message when error', () => {
      errorHandler.process(new Error(), null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: '', statusCode: 500 });
    });

    it('should return 500 when error status code < 400', () => {
      const error = new CustomError('Internal server error', 200);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
    });

    it('should return 500 when error status code >= 600', () => {
      const error = new CustomError('Internal server error', 600);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
    });

    it('should return verbatim when error status code >= 400 && status code < 600', () => {
      const error = new CustomError('Unauthorized', 401);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(401);
    });
  });
});
