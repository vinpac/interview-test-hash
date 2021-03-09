export class QueryError extends Error {
  name = 'QueryError'
  constructor(
    message: string,
    public statusCode: number,
    public payload?: Record<string, any> | string | boolean | number,
  ) {
    super(message)
  }
}
