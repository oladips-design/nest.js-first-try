import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './DTO/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    // return await this.userRepository.create<User>(user);
    try {
      // Attempt to create a new user in the database
      const newUser = await this.userRepository.create<User>(user);
      return newUser;
    } catch (error) {
      // Handle any errors that occur during the creation
      throw new Error('Failed to create user');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    // return await this.userRepository.findOne<User>({ where: { email } });
    try {
      // Attempt to find a user in the database by email
      const foundUser = await this.userRepository.findOne<User>({
        where: { email },
      });

      if (!foundUser) {
        // If the user is not found, throw a NotFoundException
        throw new NotFoundException('User not found');
      }

      return foundUser;
    } catch (error) {
      // Handle any errors that occur during the search
      throw new Error('Failed to find user by email');
    }
  }

  async findOneById(id: number): Promise<User> {
    // return await this.userRepository.findOne<User>({ where: { id } });
    try {
      // Attempt to find a user in the database by ID
      const foundUser = await this.userRepository.findOne<User>({
        where: { id },
      });

      if (!foundUser) {
        // If the user is not found, throw a NotFoundException
        throw new NotFoundException('User not found');
      }

      return foundUser;
    } catch (error) {
      // Handle any errors that occur during the search
      throw new Error('Failed to find user by ID');
    }
  }
}
