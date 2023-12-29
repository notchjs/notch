import type { ResponseGenerator } from '@armscye/response';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { ErrorResponseGenerator } from '../../../src';

describe('ErrorResponseGenerator', () => {
  let generator: ResponseGenerator;
  let statusSpy: sinon.SinonSpy;
  let jsonSpy: sinon.SinonSpy;
  let sendSpy: sinon.SinonSpy;
  let response: {
    send: sinon.SinonSpy;
    status?: sinon.SinonSpy;
    json: sinon.SinonSpy;
  };

  beforeEach(() => {
    generator = new ErrorResponseGenerator();
    statusSpy = sinon.spy();
    jsonSpy = sinon.spy();
    sendSpy = sinon.spy();
    response = {
      status: statusSpy,
      json: jsonSpy,
      send: sendSpy,
    };
  });

  describe('.reply()', () => {
    it('should return empty when nil as body', () => {
      generator.reply(response, null);
      expect(sendSpy.called).to.be.true;
      expect(sendSpy.calledWith()).to.be.true;
    });

    it('should return verbatim when string as body', () => {
      const body = 'Internal server error';
      generator.reply(response, body);
      expect(sendSpy.called).to.be.true;
      expect(sendSpy.calledWith(body)).to.be.true;
    });

    it('should return json when object as body', () => {
      const body = { message: 'Internal server error' };
      generator.reply(response, body);
      expect(jsonSpy.called).to.be.true;
      expect(jsonSpy.calledWith(body)).to.be.true;
    });

    it('should return status code and message when status', () => {
      const body = { statusCode: 500, message: 'Internal server error' };
      generator.reply(response, body, 500);
      expect(jsonSpy.called).to.be.true;
      expect(jsonSpy.calledWith(body)).to.be.true;
    });
  });
});
