import { DynamicModule, ForwardReference, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { EntitySchema } from 'typeorm';
import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Options } from 'express-rate-limit';

export interface IComponent extends ModuleMetadata {
  repositories?: Provider[];
  entities?: EntitySchema[];
}

export interface ProjectOptions {
  globalModuleConfig: Required<Omit<IComponent, 'entities'>>;
  swaggerBuilder: DocumentBuilder;
  typeormConfig: TypeOrmModuleOptions | false;
  enableHelmet: boolean;
  enableCookieParser: boolean;
  enableRateLimit: Partial<Options> | false;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface RxType<T = any> extends Function {
  new (): T;
}

export interface IBootStrap {
  main(app: INestApplication): number;
  afterListen?(port: number): void;
}

export type IImport = (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>)[];

export interface IBootStrapConfiguration {
  intercept?(app: INestApplication): void;
  rootImports?(imports: IImport): IImport;
}
