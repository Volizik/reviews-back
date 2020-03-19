import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {WorkerModule} from './worker/worker.module';
import {ReviewModule} from './review/review.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import typeormConfig from "../config/typeorm.config";

@Module({
    imports: [
        UserModule,
        WorkerModule,
        ReviewModule,
        TypeOrmModule.forRoot(typeormConfig),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
