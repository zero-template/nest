import { Module, Type } from '@nestjs/common';
import Configurations from '../project.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationContainer } from '../containers/container';
import { IImport } from '../typings';

interface IConfiguration {
  imports?: IImport;
  controllers?: Type[];
}

export function Configuration(metadata: IConfiguration = {}) {
  const imports: IImport = [];
  if (Configurations.typeormConfig) imports.push(TypeOrmModule.forRoot(Configurations.typeormConfig));
  if (metadata.imports) imports.push(...metadata.imports);

  configurationContainer.forEach((item) => {
    const { newed } = item;
    if (newed.rootImports) {
      const value = newed.rootImports(imports);
      imports.push(...value);
    }
  });

  return Module({
    imports: imports,
    controllers: metadata.controllers,
  });
}
