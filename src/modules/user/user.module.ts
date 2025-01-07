import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './resolvers/user.resolver';
import { User } from './entities/user.entity';
import { UserSetting } from './entities/user-setting.entity';
import { UserSettingService } from './services/user-settings.service';
import { UserService } from './services/user.service';
import { UserSettingsResolver } from './resolvers/user-settings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
