import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const { NODE_ENV = 'development' } = process.env;
const isTest = NODE_ENV === 'test';

const MikroOrmConfig: Options = {
  type: config.get('DB_TYPE'),
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  dbName: isTest ? config.get('DB_TEST') : config.get('DB_MAIN'),
  user: config.get('DB_USER'),
  password: config.get('DB_PASS'),
  discovery: { warnWhenNoEntities: false },
  entities: [],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  seeder: {
    path: './dist/database/seeders',
    pathTs: './src/database/seeders',
  },
};

export default MikroOrmConfig;
