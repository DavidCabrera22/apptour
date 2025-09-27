import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsString as IsCuid,
  Min,
  Max,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID del paquete turístico a reservar',
    example: 'cmfliogjx0001rkvcyyl1q195',
  })
  @IsCuid()
  tourPackageId: string;

  @ApiProperty({
    description: 'Fecha de inicio del tour (formato ISO)',
    example: '2024-03-15T00:00:00.000Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Número de personas para la reserva',
    example: 4,
    minimum: 1,
    maximum: 50,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Debe ser mínimo 1 persona' })
  @Max(50, { message: 'Máximo 50 personas por reserva' })
  numberOfPeople: number;

  @ApiProperty({
    description: 'Notas especiales o comentarios adicionales',
    example: 'Celebración de aniversario, necesitamos mesa especial',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialNotes?: string;
}
