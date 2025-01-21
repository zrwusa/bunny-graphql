import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettingService } from './user-settings.service';
import { UserSetting } from './entities/user-setting.entity';
import { CreateUserSettingsInput } from './dto/create-user-settings.input';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Mutation(() => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsInput')
    createUserSettingsInput: CreateUserSettingsInput,
  ) {
    return await this.userSettingsService.create(createUserSettingsInput);
  }
}
