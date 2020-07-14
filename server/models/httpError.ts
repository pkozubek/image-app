export default class HttpError extends Error {
  public code;

  constructor(message: string, errorCode?: number) {
    super(message);
    this.code = errorCode || 400;
  }
}
