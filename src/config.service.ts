import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Conf } from './config';


class ConfigService {

  constructor() {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(Conf.serverPort);
    /*
    {
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "dh.kim",
      "password": "rlaejrgus12$#",
      "database": "dhkim",
      "entities": ["dist/entities/*.entity{.ts,.js}"],
      "logging": true,
      "synchronize": true
    }*/
    return {

      // obviously, change these if you're using a different DB
      type: 'mysql',
      host: Conf.dbHost,
      port: Conf.dbPort,
      username: Conf.dbUser,
      password: Conf.dbPass,
      database: Conf.dbName,

      //entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: ["dist/entities/*.entity{.ts,.js}"],

      logging: true,

      //migrationsTableName: 'migration',
      //migrations: [join(__dirname, '..', 'migrations', '*.ts')],

      //cli: {
      //  migrationsDir: '../migrations',
      //},

      synchronize: true,
      //ssl: true,
    };
  }
}
const configService = new ConfigService();

export default configService;