import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, IBootStrapConfiguration } from '@zero-template/helper';
import { HttpExceptionFilter } from '../errors/http.filter';

@BootConfiguration
export class HttpExceptionFilterConfiguration extends Logger implements IBootStrapConfiguration {
  constructor() {
    super('BootStrap');
  }

  intercept(app: INestApplication): void {
    app.useGlobalFilters(new HttpExceptionFilter());
    this.debug('HttpExceptionFilter is loaded');
  }
}
