import type { ResponseGenerator } from '@armscye/response';

export class ErrorResponseGeneratorHost {
  constructor(private readonly responseGenerator: ResponseGenerator) {}

  getResponseGenerator(): ResponseGenerator {
    return this.responseGenerator;
  }
}
