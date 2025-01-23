export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um error interno não esperado aconteceu", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
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
export class ServicerError extends Error {
  constructor({ cause, message }) {
    super(message || "Um error interno não esperado aconteceu", {
      cause,
    });
    this.name = "ServicerError";
    this.action = "Serviço indisponivel no momento.";
    this.statusCode = 503;
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

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Metodo não permitido no end point");
    this.name = "MethodNotAllowedError";
    this.action = "Verifique se o metodo HTTP é valido";
    this.statusCode = 405;
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
