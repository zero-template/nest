import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, CurrentConfig, IBootStrapConfiguration, ProjectOptions } from '@zero-template/helper';
import * as CookieParser from 'cookie-parser';

@BootConfiguration
export class CookieParserConfiguration extends Logger implements IBootStrapConfiguration {
  @CurrentConfig
  private readonly currentConfig: ProjectOptions;

  constructor() {
    super('BootStrap');
  }

  intercept(app: INestApplication): void {
    if (this.currentConfig.enableCookieParser) {
      app.use(CookieParser());
      this.debug('Cookie Parser is loaded');
    } else {
      this.debug('Cookie Parser is disabled');
    }
  }
}
