import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear nueva reserva' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente' })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingsService.create(createBookingDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Obtener todas las reservas del usuario o todas (admin)',
  })
  @ApiBearerAuth('JWT-auth')
  findAll(@Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.bookingsService.findAll(
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener reserva por ID' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string, @Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.bookingsService.findOne(
      id,
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar reserva' })
  @ApiBearerAuth('JWT-auth')
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Request() req,
  ) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.bookingsService.update(
      id,
      updateBookingDto,
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar reserva' })
  @ApiBearerAuth('JWT-auth')
  cancel(@Param('id') id: string, @Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.bookingsService.cancel(
      id,
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-availability/:tourPackageId')
  @ApiOperation({
    summary: 'Verificar disponibilidad de un paquete turístico',
  })
  @ApiBearerAuth('JWT-auth')
  checkAvailability(
    @Param('tourPackageId') tourPackageId: string,
    @Body() body: { startDate: string; numberOfPeople: number },
  ) {
    return this.bookingsService.checkAvailability(
      tourPackageId,
      body.startDate,
      body.numberOfPeople,
    );
  }
}
