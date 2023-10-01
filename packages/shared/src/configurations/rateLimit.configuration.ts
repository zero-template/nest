import { INestApplication, Logger } from '@nestjs/common';
import { BootConfiguration, CurrentConfig, IBootStrapConfiguration, ProjectOptions } from '@zero-template/helper';
import rateLimit from 'express-rate-limit';

@BootConfiguration
export class RateLimitConfiguration extends Logger implements IBootStrapConfiguration {
  @CurrentConfig
  private readonly currentConfig: ProjectOptions;

  constructor() {
    super('BootStrap');
  }

  intercept(app: INestApplication): void {
    if (this.currentConfig.enableRateLimit) {
      app.use(rateLimit(this.currentConfig.enableRateLimit));
      this.debug('Rate limit is loaded');
    } else {
      this.debug('Rate limit is disabled');
    }
  }
}
