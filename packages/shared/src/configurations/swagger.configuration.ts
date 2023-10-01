import { INestApplication, Logger } from '@nestjs/common';
import { CurrentConfig, ProjectOptions } from '@zero-template/helper';
import { SwaggerModule } from '@nestjs/swagger';
import { BootConfiguration, IBootStrapConfiguration } from '@zero-template/helper';

@BootConfiguration
export class SwaggerConfiguration extends Logger implements IBootStrapConfiguration {
  constructor() {
    super('BootStrap');
  }

  @CurrentConfig
  private readonly currentConfig: ProjectOptions;

  intercept(app: INestApplication): void {
    const options = this.currentConfig.swaggerBuilder.build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document, {
      jsonDocumentUrl: '/docs/swagger.json',
      yamlDocumentUrl: '/docs/swagger.yaml',
    });
    this.debug('Swagger is loaded');
  }
}
