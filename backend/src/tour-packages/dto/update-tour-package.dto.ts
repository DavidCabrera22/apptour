import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTourPackageDto } from './create-tour-package.dto';

export class UpdateTourPackageDto extends PartialType(CreateTourPackageDto) {
  @ApiPropertyOptional({
    description: 'Archivo de imagen del paquete (opcional para actualización)',
    type: 'string',
    format: 'binary',
  })
  image?: any;
}
