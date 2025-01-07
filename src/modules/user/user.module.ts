import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './resolvers/user.resolver';
import { User } from './entities/user.entity';
import { UserSetting } from './entities/user-setting.entity';
import { UserSettingService } from './services/user-settings.service';
import { UserService } from './services/user.service';
import { UserSettingsResolver } from './resolvers/user-settings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])], // The core function of TypeOrmModule.forFeature is to convert the specified entities into an Injectable Provider and register them into NestJS's dependency injection container. These converted Repositories can be directly injected into your services without the need to manually add them to the providers array.
  providers: [
    UserService,
    UserResolver,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
