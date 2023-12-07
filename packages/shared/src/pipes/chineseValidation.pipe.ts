import { PipeTransform, Injectable as Pipe, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Pipe()
export class ChineseValidationPipe implements PipeTransform {
  /**
   * 获取目前真正的错误信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 04/09/2023
   * @private
   * @param {ValidationError} error
   * @return {*}  {ValidationError}
   * @memberof ValidationPipe
   */
  private getReadError(error: ValidationError): ValidationError {
    if (error.constraints) return error;
    if (error.children) return this.getReadError(error.children[0]);
  }

  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    // 如果没有有错误信息 那就直接返回
    if (errors.length === 0) return value;

    // 如果没有空错误 但是有其他错误 则抛出
    const error = this.getReadError(errors[0]);
    // 获取第一个错误信息
    const msg = Object.values(error.constraints)[0];
    const validator = this.validator(error);
    new Logger().error(validator ? validator : '错误：' + msg, 'Nai Request Pipe ERROR!');
    // 抛出错误 由拦截器处理
    throw new BadRequestException(validator ? validator : '错误：' + msg, 'Pipe Throwed');
  }

  /**
   * 验证器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 26/07/2023
   * @private
   * @param {Function} metatype
   * @return {*}  {boolean}
   * @memberof ValidationPipe
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  /**
   * 信息过滤器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 01/07/2023
   * @private
   * @param {ValidationError} error
   * @return {*}  {(string | null)}
   * @memberof ValidationPipe
   */
  private validator(error: ValidationError): string | null {
    if (error.constraints.isNotEmpty) {
      return `错误：${error.property}参数不能为空`;
    } else if (error.constraints.isArray && /must be an array/.test(error.constraints.isArray)) {
      return `错误：${error.property}参数必须是Array`;
    } else if (error.constraints.isString && /must be an string/.test(error.constraints.isString)) {
      return `错误：${error.property}参数必须是String`;
    } else if (error.constraints.isNumberString && /must be a number string/.test(error.constraints.isNumberString)) {
      return `错误：${error.property}参数必须是一个数字`;
    } else if (error.constraints.isUrl && /must be an url/.test(error.constraints.isUrl)) {
      return `错误：${error.property}参数必须是一个有效的URL地址`;
    } else if (error.constraints.isNumber && /must be a number/.test(error.constraints.isNumber)) {
      return `错误：${error.property}参数必须是一个数字`;
    } else if (error.constraints.isIn && /must be one of the following values: /.test(error.constraints.isIn)) {
      const getEnum = error.constraints.isIn.split(': ')[1];
      return `错误：${error.property}参数必须是以下选项：${getEnum}`;
    } else if (error.constraints.min && /must not be less than/.test(error.constraints.min)) {
      const getMinNum = error.constraints.min.split('than ')[1];
      return `错误：${error.property}参数必须不小于${getMinNum}`;
    } else if (error.constraints.max && /must not be greater than/.test(error.constraints.max)) {
      const getMaxNum = error.constraints.max.split('than ')[1];
      return `错误：${error.property}参数必须不小于${getMaxNum}`;
    } else if (error.constraints.isInt && /must be an integer number/.test(error.constraints.isInt)) {
      return `错误：${error.property}参数必须为整型数字`;
    } else if (error.constraints.isEmail) {
      return `错误：${error.property}参数必须为一个有效的电子邮件地址`;
    } else if (error.constraints.isMobilePhone) {
      return `错误：${error.property}参数必须为一个有效的手机号码`;
    } else {
      return null;
    }
  }
}
