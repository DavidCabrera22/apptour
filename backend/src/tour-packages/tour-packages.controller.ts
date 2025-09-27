import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TourPackagesService } from './tour-packages.service';
import {
  CreateTourPackageDto,
  UpdateTourPackageDto,
} from '../tour-packages/dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tour-packages')
@Controller('tour-packages')
export class TourPackagesController {
  constructor(private readonly tourPackagesService: TourPackagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Crear nuevo paquete turístico (Solo ADMIN/SUPER_ADMIN)',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @Body() createDto: CreateTourPackageDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw new UnauthorizedException(
        'Solo ADMIN y SUPER_ADMIN pueden crear paquetes',
      );
    }

    return this.tourPackagesService.create(createDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los paquetes turísticos activos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('location') location?: string,
  ) {
    return this.tourPackagesService.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
      search,
      location,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener paquete turístico por ID' })
  findOne(@Param('id') id: string) {
    return this.tourPackagesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar paquete turístico (Solo ADMIN/SUPER_ADMIN)',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateTourPackageDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw new UnauthorizedException(
        'Solo ADMIN y SUPER_ADMIN pueden actualizar paquetes',
      );
    }

    return this.tourPackagesService.update(id, updateDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar paquete turístico (Solo SUPER_ADMIN)' })
  @ApiBearerAuth('JWT-auth')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'SUPER_ADMIN') {
      throw new UnauthorizedException(
        'Solo SUPER_ADMIN puede eliminar paquetes',
      );
    }

    return this.tourPackagesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-active')
  @ApiOperation({
    summary: 'Activar/Desactivar paquete turístico (Solo ADMIN/SUPER_ADMIN)',
  })
  @ApiBearerAuth('JWT-auth')
  toggleActive(@Request() req, @Param('id') id: string) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw new UnauthorizedException(
        'Solo ADMIN y SUPER_ADMIN pueden cambiar el estado de paquetes',
      );
    }

    return this.tourPackagesService.toggleActive(id);
  }
}
