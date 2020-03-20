import * as config from 'config';
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

const dbConfig = config.get('database');

const typeormConfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": dbConfig.host,
    "port": dbConfig.port,
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.name,
    "entities": [__dirname + '/../../dist/**/*.entity.js'],
    "synchronize": true,
};

export default typeormConfig;
