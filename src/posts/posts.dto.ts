import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsNumber, IsInt, IsPositive } from 'class-validator';

export class CreateNewPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsNumber()
  @IsInt()
  @IsPositive()
  authorId: number;
}

export class UpdateUserDto extends PartialType(CreateNewPostDto) {}
