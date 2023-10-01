/**
 * TypeORM migration config.
 * In general, you don't need to modify this file.
 *
 * TypeORM 迁移配置。
 * 一般情况下，不需要修改此文件。
 *
 * @see https://typeorm.io/#/migrations
 */

import { DataSource, TypeORMError } from 'typeorm';
import { join } from 'path';
import Configuration from '@zero-template/helper/dist/project.config';

if (!Configuration.typeormConfig) throw new TypeORMError('TypeORM is disabled');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dataSource = new DataSource({
  ...Configuration.typeormConfig,
  entities: [join(process.cwd(), 'src/entities/**/*.entity.ts')],
  migrations: [join(process.cwd(), 'src/migrations/**/*.ts')],
  logging: true,
});

export default dataSource;
