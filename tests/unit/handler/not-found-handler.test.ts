import type { NotchHandler } from '@armscye/handler';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { NotFoundHandler } from '../../../src';

describe('NotFoundHandler', () => {
  let handler: NotchHandler;
  let response: {
    send: sinon.SinonSpy;
    status?: sinon.SinonSpy;
    json: sinon.SinonSpy;
  };
  let request: any;

  beforeEach(() => {
    handler = new NotFoundHandler();
    response = {
      status: sinon.spy(),
      json: sinon.spy(),
      send: sinon.spy(),
    };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    response.send = sinon.stub().returns(response);
    request = (method: string, url: string) => ({
      method: method,
      url: url,
    });
  });

  it('should respond with error message when GET request', () => {
    handler.handle(request('GET', '/foo'), response);
    expect(response.send.called).to.be.true;
    expect(response.send.calledWith('Cannot GET /foo')).to.be.true;
  });

  it('should respond with error message when POST request', () => {
    handler.handle(request('POST', '/foo'), response);
    expect(response.send.called).to.be.true;
    expect(response.send.calledWith('Cannot POST /foo')).to.be.true;
  });

  it('should respond with error message when OPTIONS request', () => {
    handler.handle(request('OPTIONS', '/foo'), response);
    expect(response.send.called).to.be.true;
    expect(response.send.calledWith('Cannot OPTIONS /foo')).to.be.true;
  });
});
