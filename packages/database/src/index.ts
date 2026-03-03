import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.js';

export * from './entities/Url';

export async function initORM() {
  const orm = await MikroORM.init(config);
  await orm.schema.updateSchema();
  return orm;
}