import { Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}