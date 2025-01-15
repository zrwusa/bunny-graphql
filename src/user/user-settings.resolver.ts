import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettingService } from './user-settings.service';
import { UserSetting } from '../entities/user-setting.entity';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Mutation(() => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsDto')
    createUserSettingsData: CreateUserSettingsDto,
  ) {
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
