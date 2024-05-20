import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
  constructor(value: string) {
    super(` Id ${value} not found`, HttpStatus.NOT_FOUND);
  }
}
