export class Result<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  constructor(
    success: boolean,
    data: T | null = null,
    error: string | null = null,
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      error: this.error,
    };
  }

  static successResult<T>(data: T) {
    return new Result<T>(true, data);
  }

  static failureResult<T>(message: string) {
    return new Result<T>(false, null, message);
  }
}
