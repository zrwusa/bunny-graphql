import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(createPostInput: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: createPostInput.userId },
    });

    if (!user) throw new Error('User Not Found');

    const newUserPost = this.postRepository.create({
      ...createPostInput,
      user,
    });

    return await this.postRepository.save(newUserPost);
  }

  async getPosts() {
    return await this.postRepository.find({ relations: ['user'] });
  }
}
