import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserResolver } from '../user/user.resolver';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [UserService, UserResolver, PostService, PostResolver],
})
export class PostModule {}
