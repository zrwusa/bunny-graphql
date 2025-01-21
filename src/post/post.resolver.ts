import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput')
    createPostInput: CreatePostInput,
  ) {
    return await this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return await this.postService.findAll();
  }
}
