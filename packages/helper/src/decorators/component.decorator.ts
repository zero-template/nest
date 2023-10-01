import { Module } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import Configuration from '../project.config';
import { IComponent } from '../typings/common.typing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WATERMARK } from '../constants/watermark.constant';

export function Component(metadata: IComponent = Configuration.globalModuleConfig) {
  if (metadata.repositories) {
    metadata.repositories.forEach((item) => {
      const isRepository = Reflect.getMetadata(WATERMARK.REPOSITORY, item);
      if (!isRepository) throw new RuntimeException(`Helper Runtime Error: ${item} is not a repository.`);
    });
  }

  if (metadata.providers) {
    metadata.providers.forEach((item) => {
      const isRepository = Reflect.getMetadata(WATERMARK.REPOSITORY, item);
      if (isRepository) throw new RuntimeException(`Helper Runtime Error: ${item} is a repository. Please inject to repositories property.`);
    });
  }

  return Module({
    controllers: [...Configuration.globalModuleConfig.controllers, ...metadata.controllers],
    providers: [...Configuration.globalModuleConfig.providers, ...Configuration.globalModuleConfig.repositories, ...metadata.providers],
    exports: [...Configuration.globalModuleConfig.exports, ...metadata.exports],
    imports: [TypeOrmModule.forFeature([...metadata.entities]), ...Configuration.globalModuleConfig.imports, ...metadata.imports],
  });
}
