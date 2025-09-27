import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, userId: string) {
    const { bookingId, amount, method, paymentToken } = createPaymentDto;

    // Verificar que la reserva existe y pertenece al usuario
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        payment: true,
        tourPackage: {
          select: {
            title: true,
            location: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (booking.userId !== userId) {
      throw new BadRequestException(
        'No tienes permisos para pagar esta reserva',
      );
    }

    // Verificar que la reserva esté en estado PENDING o CONFIRMED
    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw new BadRequestException(
        'Solo se pueden pagar reservas pendientes o confirmadas',
      );
    }

    // Verificar que no tenga ya un pago
    if (booking.payment) {
      throw new ConflictException('Esta reserva ya tiene un pago asociado');
    }

    // Verificar que el monto coincida con el total de la reserva
    if (new Decimal(amount).toNumber() !== booking.totalPrice.toNumber()) {
      throw new BadRequestException(
        'El monto del pago no coincide con el total de la reserva',
      );
    }

    // Simular procesamiento del pago
    const paymentResult = await this.processPayment(
      paymentToken,
      amount,
      method,
    );

    // Crear el pago
    const payment = await this.prisma.payment.create({
      data: {
        bookingId,
        amount: new Decimal(amount),
        method,
        status: paymentResult.success ? 'COMPLETED' : 'FAILED',
      },
      include: {
        booking: {
          include: {
            tourPackage: {
              select: {
                title: true,
                location: true,
              },
            },
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Si el pago fue exitoso, actualizar el estado de la reserva
    if (paymentResult.success) {
      await this.prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CONFIRMED' },
      });
    }

    return {
      payment,
      message: paymentResult.success
        ? 'Pago procesado exitosamente'
        : 'Error al procesar el pago',
      transactionId: paymentResult.transactionId,
    };
  }

  async findAll(userId?: string, isAdmin: boolean = false) {
    const where = isAdmin
      ? {}
      : {
          booking: {
            userId,
          },
        };

    return this.prisma.payment.findMany({
      where,
      include: {
        booking: {
          include: {
            tourPackage: {
              select: {
                title: true,
                location: true,
              },
            },
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId?: string, isAdmin: boolean = false) {
    const where: any = { id };
    if (!isAdmin) {
      where.booking = { userId };
    }

    const payment = await this.prisma.payment.findUnique({
      where,
      include: {
        booking: {
          include: {
            tourPackage: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return payment;
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
    isAdmin: boolean = false,
  ) {
    if (!isAdmin) {
      throw new BadRequestException(
        'Solo los administradores pueden actualizar pagos',
      );
    }

    const existingPayment = await this.findOne(id, undefined, true);

    // No permitir cambiar pagos completados a menos que sea para reembolso
    if (
      existingPayment.status === 'COMPLETED' &&
      updatePaymentDto.status !== 'REFUNDED'
    ) {
      throw new BadRequestException(
        'Solo se puede cambiar un pago completado a reembolsado',
      );
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
      include: {
        booking: {
          include: {
            tourPackage: {
              select: {
                title: true,
                location: true,
              },
            },
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Si se marca como reembolsado, actualizar el estado de la reserva
    if (updatePaymentDto.status === 'REFUNDED') {
      await this.prisma.booking.update({
        where: { id: updatedPayment.bookingId },
        data: { status: 'CANCELLED' },
      });
    }

    return {
      payment: updatedPayment,
      message: 'Pago actualizado exitosamente',
    };
  }

  async refund(id: string, isAdmin: boolean = false) {
    if (!isAdmin) {
      throw new BadRequestException(
        'Solo los administradores pueden procesar reembolsos',
      );
    }

    const payment = await this.findOne(id, undefined, true);

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException(
        'Solo se pueden reembolsar pagos completados',
      );
    }

    // Simular procesamiento del reembolso
    const refundResult = await this.processRefund(
      payment.id,
      payment.amount.toNumber(),
    );

    if (!refundResult.success) {
      throw new BadRequestException('Error al procesar el reembolso');
    }

    // Actualizar el pago y la reserva
    const [updatedPayment] = await Promise.all([
      this.prisma.payment.update({
        where: { id },
        data: { status: 'REFUNDED' },
        include: {
          booking: {
            include: {
              tourPackage: {
                select: {
                  title: true,
                  location: true,
                },
              },
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CANCELLED' },
      }),
    ]);

    return {
      payment: updatedPayment,
      message: 'Reembolso procesado exitosamente',
      refundId: refundResult.refundId,
    };
  }

  // Método simulado para procesar pagos con pasarela externa
  private async processPayment(
    paymentToken: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    amount: number, // eslint-disable-line @typescript-eslint/no-unused-vars
    method: any, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<{ success: boolean; transactionId: string }> {
    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular 95% de éxito en los pagos
    const success = Math.random() > 0.05;

    return {
      success,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  // Método simulado para procesar reembolsos
  private async processRefund(
    paymentId: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    amount: number, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<{ success: boolean; refundId: string }> {
    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simular 98% de éxito en los reembolsos
    const success = Math.random() > 0.02;

    return {
      success,
      refundId: `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  // Obtener estadísticas de pagos (solo para admins)
  async getPaymentStats(isAdmin: boolean = false) {
    if (!isAdmin) {
      throw new BadRequestException(
        'Solo los administradores pueden ver estadísticas',
      );
    }

    const [
      totalPayments,
      completedPayments,
      failedPayments,
      refundedPayments,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.payment.count(),
      this.prisma.payment.count({ where: { status: 'COMPLETED' } }),
      this.prisma.payment.count({ where: { status: 'FAILED' } }),
      this.prisma.payment.count({ where: { status: 'REFUNDED' } }),
      this.prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalPayments,
      completedPayments,
      failedPayments,
      refundedPayments,
      pendingPayments:
        totalPayments - completedPayments - failedPayments - refundedPayments,
      totalRevenue: totalRevenue._sum.amount || 0,
      successRate:
        totalPayments > 0 ? (completedPayments / totalPayments) * 100 : 0,
    };
  }
}
