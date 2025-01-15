import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find({ relations: ['settings'] });
  }

  getUserById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  createUser(createUserData: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserData);
    return this.usersRepository.save(newUser);
  }
}
