export class ApiResponseDto<T> {
  constructor(
    public message: string,
    public data: T,
  ) {}
}
