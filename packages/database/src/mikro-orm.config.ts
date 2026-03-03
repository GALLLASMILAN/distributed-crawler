import { defineConfig } from '@mikro-orm/postgresql';
import { Url } from './entities/Url.js';

export default defineConfig({
  entities: [Url],
  dbName: 'crawler',
  user: process.env.POSTGRES_USER ?? 'crawler',
  password: process.env.POSTGRES_PASSWORD ?? 'crawler',
  host:  process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
});