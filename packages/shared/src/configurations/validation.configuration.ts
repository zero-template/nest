import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, IBootStrapConfiguration } from '@zero-template/helper';
import { EnglishValidationPipe } from '../pipes/englishValidation.pipe';

@BootConfiguration
export class ValidationPipeConfiguration extends Logger implements IBootStrapConfiguration {
  constructor() {
    super('bootStrap');
  }

  intercept(app: INestApplication<any>): void {
    // app.useGlobalPipes(new ChineseValidationPipe());
    app.useGlobalPipes(new EnglishValidationPipe());
    this.debug('ClassValidationPipe is loaded');
  }
}
