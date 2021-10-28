export class CustomError extends Error {
  status: number
  code: number
  constructor(status = 500, message: string, code = 500) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not found', code = 404) {
    super(404, message, code);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Bad request', code = 400) {
    super(400, message, code);
  }
}

export class BusinessError extends CustomError {
  constructor(message = 'Bad request', code = 412) {
    super(412, message, code);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Not authorized', code = 403) {
    super(403, message, code);
  }
}

export class PartialContentError extends CustomError {
  constructor(message = 'Partial Content', code = 206) {
    super(206, message, code);
  }
}