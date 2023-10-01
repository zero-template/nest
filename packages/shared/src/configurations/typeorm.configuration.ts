import { Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootConfiguration, CurrentConfig, IBootStrapConfiguration, IImport, ProjectOptions } from '@zero-template/helper';
import { join } from 'path';

@BootConfiguration
export class TypeORMConfiguration extends Logger implements IBootStrapConfiguration {
  @CurrentConfig
  private readonly currentConfig: ProjectOptions;

  constructor() {
    super('BootStrap');
  }

  rootImports(imports: IImport): IImport {
    if (this.currentConfig.typeormConfig) {
      imports.push(
        TypeOrmModule.forRoot({
          ...this.currentConfig.typeormConfig,
          entities: [join(process.cwd(), 'src/entities/**/*.entity.ts')],
        }),
      );
      this.debug('TypeORM is loaded');
    } else {
      this.debug('TypeORM is disabled');
    }

    return imports;
  }
}
