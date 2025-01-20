import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostDto')
    createPostInput: CreatePostDto,
  ) {
    return await this.postService.createPost(createPostInput);
  }

  @Query(() => [Post])
  async getPosts() {
    return await this.postService.getPosts();
  }
}
