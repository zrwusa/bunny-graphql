import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from './entities/user-setting.entity';
import { User } from './entities/user.entity';
import { CreateUserSettingsInput } from './dto/create-user-settings.input';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(userId: string) {
    return this.userSettingsRepository.findOneBy({ userId });
  }

  async create(createUserSettingsInput: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsInput.userId,
    });

    if (!findUser) throw new Error('User Not Found');

    const newUserSetting = this.userSettingsRepository.create(
      createUserSettingsInput,
    );
    const savedSettings =
      await this.userSettingsRepository.save(newUserSetting);

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }
}
