import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class PromoteUserDto {
  @ApiProperty({
    description: 'ID del usuario a promover',
    example: 'clxxx123456789',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Nuevo rol para el usuario',
    enum: UserRole,
    example: 'ADMIN',
  })
  @IsEnum(UserRole)
  newRole: UserRole;
}
