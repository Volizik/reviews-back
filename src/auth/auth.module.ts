import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
