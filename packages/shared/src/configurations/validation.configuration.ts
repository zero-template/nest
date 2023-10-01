import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, IBootStrapConfiguration } from '@zero-template/helper';
import { ValidationPipe } from '../pipes/validation.pipe';

@BootConfiguration
export class ValidationPipeConfiguration extends Logger implements IBootStrapConfiguration {
  constructor() {
    super('bootStrap');
  }

  intercept(app: INestApplication<any>): void {
    app.useGlobalPipes(new ValidationPipe());
    this.debug('ClassValidationPipe is loaded');
  }
}
