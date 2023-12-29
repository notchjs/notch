import type { ResponseGenerator } from '@armscye/response';
import { isNil, isObject } from '@hemjs/notions';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { ErrorHandler } from '../../../src';
import { CustomError } from '../fixtures/custom-error';
import { NoopErrorResponseGenerator } from '../noop-error-response-generator';

describe('ErrorHandler', () => {
  let generator: ResponseGenerator;
  let errorHandler: ErrorHandler;
  let statusSpy: sinon.SinonSpy;
  let jsonSpy: sinon.SinonSpy;
  let sendSpy: sinon.SinonSpy;
  let response: {
    send: sinon.SinonSpy;
    status?: sinon.SinonSpy;
    json: sinon.SinonSpy;
  };

  beforeEach(() => {
    generator = new NoopErrorResponseGenerator();
    errorHandler = new ErrorHandler(generator);
    statusSpy = sinon.spy();
    jsonSpy = sinon.spy();
    sendSpy = sinon.spy();
    response = {
      status: statusSpy,
      json: jsonSpy,
      send: sendSpy,
    };
  });

  describe('.process()', () => {
    beforeEach(() => {
      sinon
        .stub(generator, 'reply')
        .callsFake((responseRef: any, body: any, statusCode?: number) => {
          if (statusCode) {
            responseRef.status(statusCode);
          }
          if (isNil(body)) {
            return responseRef.send();
          }
          return isObject(body)
            ? responseRef.json(body)
            : responseRef.send(String(body));
        });
    });

    it('should return status code and message when error', () => {
      errorHandler.process(new Error(), null, response, null);
      expect(statusSpy.calledWith(500)).to.be.true;
      expect(jsonSpy.calledWith({ message: '', statusCode: 500 })).to.be.true;
    });

    it('should return 500 when error status code < 400', () => {
      const error = new CustomError('Internal server error', 200);
      errorHandler.process(error, null, response, null);
      expect(statusSpy.calledWith(500)).to.be.true;
    });

    it('should return 500 when error status code >= 600', () => {
      const error = new CustomError('Internal server error', 600);
      errorHandler.process(error, null, response, null);
      expect(statusSpy.calledWith(500)).to.be.true;
    });

    it('should return verbatim when error status code >= 400 && status code < 600', () => {
      const error = new CustomError('Unauthorized', 401);
      errorHandler.process(error, null, response, null);
      expect(statusSpy.calledWith(401)).to.be.true;
    });
  });
});
