import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOAuthService } from './google-oauth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthResolver, AuthService, GoogleOAuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
