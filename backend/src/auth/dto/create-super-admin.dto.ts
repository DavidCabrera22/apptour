import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperAdminDto {
  @ApiProperty({
    description: 'Email del SUPER_ADMIN',
    example: 'superadmin@apptour.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del SUPER_ADMIN (mínimo 6 caracteres)',
    example: 'superadmin123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nombre del SUPER_ADMIN',
    example: 'Super',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Apellido del SUPER_ADMIN',
    example: 'Admin',
  })
  @IsString()
  lastName: string;
}
