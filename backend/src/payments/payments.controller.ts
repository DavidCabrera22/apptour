import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Procesar pago de una reserva' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Pago procesado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos del pago' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentsService.create(createPaymentDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los pagos del usuario o todos (admin)',
  })
  @ApiBearerAuth('JWT-auth')
  findAll(@Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.paymentsService.findAll(
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  @ApiOperation({
    summary: 'Obtener estadísticas de pagos (Solo ADMIN/SUPER_ADMIN)',
  })
  @ApiBearerAuth('JWT-auth')
  getStats(@Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.paymentsService.getPaymentStats(isAdmin);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener pago por ID' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string, @Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.paymentsService.findOne(
      id,
      isAdmin ? undefined : req.user.id,
      isAdmin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar pago (Solo ADMIN/SUPER_ADMIN)' })
  @ApiBearerAuth('JWT-auth')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Request() req,
  ) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    if (!isAdmin) {
      throw new UnauthorizedException(
        'Solo ADMIN y SUPER_ADMIN pueden actualizar pagos',
      );
    }

    return this.paymentsService.update(id, updatePaymentDto, isAdmin);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/refund')
  @ApiOperation({ summary: 'Procesar reembolso (Solo ADMIN/SUPER_ADMIN)' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Reembolso procesado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al procesar reembolso' })
  refund(@Param('id') id: string, @Request() req) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    if (!isAdmin) {
      throw new UnauthorizedException(
        'Solo ADMIN y SUPER_ADMIN pueden procesar reembolsos',
      );
    }

    return this.paymentsService.refund(id, isAdmin);
  }
}
