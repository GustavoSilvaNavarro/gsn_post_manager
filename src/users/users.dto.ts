import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'; // Import PartialType

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional() // Name is optional as per your Prisma schema
  name?: string;
}

// PartialType makes all properties of CreateUserDto optional
// This means you can send just 'email' or just 'name', or both, for an update.
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // You can add additional validation rules here that are specific to updates,
  // or override existing ones if needed. For now, it simply inherits and
  // makes all fields optional as suitable for an update operation.
}
