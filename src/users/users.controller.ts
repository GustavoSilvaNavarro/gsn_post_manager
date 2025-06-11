import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Logger,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UsersService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Received request to create user: ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async retrieveListOfUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUser(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Received request to find user with ID: ${id}`);
    return this.userService.findUserBasedOnId(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserData(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserBasedOnId(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeUserRecord(@Param('id', ParseIntPipe) id: number) {
    const userId = await this.userService.deleteUserById(id);
    return { msg: `User with ID: ${userId}, has been successfully removed` };
  }
}
