import { IsString, IsDateString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({
    description: 'ID del paquete turístico',
    example: 'clp123abc456def789',
  })
  @IsString()
  tourPackageId: string;

  @ApiProperty({
    description: 'Fecha de inicio del tour',
    example: '2024-06-15',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Número de personas (se usará como quantity)',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  numberOfPeople: number;
}
