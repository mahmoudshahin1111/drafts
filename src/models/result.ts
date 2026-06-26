type ResultError = {
  key: string;
  message: string;
};

export class Result<T> {
  success: boolean;
  data: T | null;
  error: ResultError | null;
  constructor(
    success: boolean,
    data: T | null = null,
    error: ResultError | null = null,
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

  static failureResult<T>(error: ResultError) {
    return new Result<T>(false, null, error);
  }
}
