import { AppError } from 'commons/logic';

export class SessionError extends AppError {
  private constructor(message: string) {
    super(`${message}`, 'SessionError');
  }

  static build(value: string) {
    return new this(value);
  }
}
