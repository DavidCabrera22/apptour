import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'miPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString()
  lastName: string;
}
