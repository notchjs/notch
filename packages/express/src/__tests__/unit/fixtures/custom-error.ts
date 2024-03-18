export class CustomError extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
