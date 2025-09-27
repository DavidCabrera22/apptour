import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateTourPackageDto {
  @ApiProperty({
    description: 'Título del paquete turístico',
    example: 'Tour Machu Picchu 3 días',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del paquete',
    example: 'Descubre la maravilla de Machu Picchu en un tour de 3 días...',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del paquete en Pesos Colombianos (COP)',
    example: 1200000,
    minimum: 20000,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(50000, { message: 'El precio mínimo es $50,000 COP' })
  @Max(50000000, { message: 'El precio máximo es $50,000,000 COP' })
  price: number;

  @ApiProperty({
    description: 'Duración del tour en días',
    example: 3,
    minimum: 1,
    maximum: 365,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(365)
  duration: number;

  @ApiProperty({
    description: 'Número máximo de personas',
    example: 15,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  maxPeople: number;

  @ApiProperty({
    description: 'Ubicación del tour',
    example: 'Cusco, Perú',
  })
  @IsString()
  location: string;

  @ApiPropertyOptional({
    description: 'URL de imagen del paquete',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @ValidateIf((o) => o.imageUrl && o.imageUrl.trim() !== '')
  @IsUrl({}, { message: 'imageUrl must be a valid URL address' })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Estado activo del paquete',
    example: true,
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean = true;

  @ApiPropertyOptional({
    description: 'Archivo de imagen del paquete',
    type: 'string',
    format: 'binary',
  })
  image?: any;
}
