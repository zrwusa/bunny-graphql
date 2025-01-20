import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
