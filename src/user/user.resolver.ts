import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
