import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Erro na requisição") {
    super(400, message);
  }
}
