import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, CurrentConfig, IBootStrapConfiguration, ProjectOptions } from '@zero-template/helper';
import helmet from 'helmet';

@BootConfiguration
export class HelmetConfiguration extends Logger implements IBootStrapConfiguration {
  @CurrentConfig
  private readonly currentConfig: ProjectOptions;

  constructor() {
    super('BootStrap');
  }

  intercept(app: INestApplication): void {
    if (this.currentConfig.enableHelmet) {
      app.use(helmet());
      this.debug('Helmet is loaded');
    } else {
      this.debug('Helmet is disabled');
    }
  }
}
