import { ArgumentMetadata, BadRequestException, Injectable as Pipe, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Pipe()
export class EnglishValidationPipe implements PipeTransform {
  private getReadError(error: ValidationError): ValidationError {
    if (error.constraints) return error;
    if (error.children) return this.getReadError(error.children[0]);
  }

  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length === 0) return value;
    const error = this.getReadError(errors[0]);
    const msg = Object.values(error.constraints)[0];
    throw new BadRequestException(msg);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
