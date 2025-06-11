import {
  Injectable,
  Logger,
  ConflictException, // Added for unique constraint errors
  InternalServerErrorException, // Generic error for unexpected issues
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User, Prisma } from '@prisma/client'; // Import the User model type from Prisma client

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    try {
      this.logger.log(`Attempting to create user with email: ${email}`);

      const user = await this.prisma.user.create({ data: createUserDto });
      return user;
    } catch (err) {
      this.logger.error('Failed to create user', err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException(`Email '${email}' already exists.`);
      }
      throw new InternalServerErrorException('An unexpected error occurred during user creation.');
    }
  }

  async findAllUsers(): Promise<Array<User>> {
    return await this.prisma.user.findMany({ include: { posts: true } }); // Eager load posts associated with each user
  }

  async findUserBasedOnId(id: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
      return user;
    } catch (err) {
      const defaultMsg = `Record was not retrieved for ID: ${id}`;
      this.logger.error(`Record could not be retrieve for ID: ${id}`);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.cause ?? defaultMsg;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }

  async updateUserBasedOnId(id: number, payload: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: payload,
      });

      return updatedUser;
    } catch (err) {
      this.logger.error(`Error updating user record with ID: ${id}`, err);
      const defaultMsg = `Error updating following user -> ID: ${id}`;
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.cause ?? defaultMsg;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }

  async deleteUserById(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      return deletedUser.id;
    } catch (err) {
      const defaultErr = `Error deleting user record with ID: ${id}`;
      this.logger.error(defaultErr, err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.meta?.cause ?? defaultErr;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }
}
