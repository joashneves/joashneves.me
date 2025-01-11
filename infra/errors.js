export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um error interno não esperado aconteceu", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = "500";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized access.") {
    super(message);
    this.name = "UnauthorizedError";
    this.action = "Verify your credentials and try again.";
    this.statusCode = "401";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

