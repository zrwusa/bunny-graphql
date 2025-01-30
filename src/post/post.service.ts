import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPostInput: CreatePostInput) {
    const user = await this.userRepository.findOne({
      where: { id: createPostInput.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const newUserPost = this.postRepository.create({
      ...createPostInput,
      user,
    });

    return await this.postRepository.save(newUserPost);
  }

  async findAll() {
    return await this.postRepository.find({ relations: ['user'] });
  }
}
