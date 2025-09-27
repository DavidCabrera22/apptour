import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    const { tourPackageId, startDate, numberOfPeople } = createBookingDto;

    // Verificar que el paquete turístico existe y está activo
    const tourPackage = await this.prisma.tourPackage.findUnique({
      where: { id: tourPackageId },
    });

    if (!tourPackage) {
      throw new NotFoundException('Paquete turístico no encontrado');
    }

    if (!tourPackage.isActive) {
      throw new BadRequestException(
        'Este paquete turístico no está disponible',
      );
    }

    // Verificar capacidad máxima
    if (numberOfPeople > tourPackage.maxPeople) {
      throw new BadRequestException(
        `El número máximo de personas para este tour es ${tourPackage.maxPeople}`,
      );
    }

    // Verificar que la fecha sea futura
    const bookingDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate <= today) {
      throw new BadRequestException('La fecha de inicio debe ser futura');
    }

    // Calcular fecha de fin
    const endDate = new Date(bookingDate);
    endDate.setDate(endDate.getDate() + tourPackage.duration);

    // Calcular precio total
    const totalPrice = new Decimal(tourPackage.price.toString())
      .mul(numberOfPeople)
      .toNumber();

    // Crear la reserva (sin bookingCode, numberOfPeople, specialNotes ya que no están en el schema)
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        tourPackageId,
        startDate: bookingDate,
        endDate,
        totalPrice: new Decimal(totalPrice),
        status: 'PENDING',
      },
      include: {
        tourPackage: {
          select: {
            title: true,
            location: true,
            duration: true,
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
    });

    return booking;
  }

  async findAll(userId?: string, isAdmin: boolean = false) {
    const where = isAdmin ? {} : { userId };

    return this.prisma.booking.findMany({
      where,
      include: {
        tourPackage: {
          select: {
            title: true,
            location: true,
            duration: true,
            imageUrl: true,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId?: string, isAdmin: boolean = false) {
    const where: any = { id };
    if (!isAdmin) {
      where.userId = userId;
    }

    const booking = await this.prisma.booking.findUnique({
      where,
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
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
    userId?: string,
    isAdmin: boolean = false,
  ) {
    // Verificar que la reserva existe
    const existingBooking = await this.findOne(id, userId, isAdmin);

    // Solo admins pueden cambiar el estado
    if (updateBookingDto.status && !isAdmin) {
      throw new ForbiddenException(
        'Solo los administradores pueden cambiar el estado de la reserva',
      );
    }

    // No permitir modificar reservas completadas o canceladas
    if (
      existingBooking.status === 'COMPLETED' ||
      existingBooking.status === 'CANCELLED'
    ) {
      throw new BadRequestException(
        'No se puede modificar una reserva completada o cancelada',
      );
    }

    const updateData: any = {};

    // Si se actualiza la fecha o número de personas, recalcular precio
    if (updateBookingDto.startDate || updateBookingDto.numberOfPeople) {
      const tourPackage = await this.prisma.tourPackage.findUnique({
        where: { id: existingBooking.tourPackageId },
      });

      if (!tourPackage) {
        throw new NotFoundException('Paquete turístico no encontrado');
      }

      const newNumberOfPeople =
        updateBookingDto.numberOfPeople ||
        this.getNumberOfPeopleFromPrice(
          existingBooking.totalPrice,
          tourPackage.price,
        );
      const newStartDate = updateBookingDto.startDate
        ? new Date(updateBookingDto.startDate)
        : existingBooking.startDate;

      // Verificar capacidad
      if (newNumberOfPeople > tourPackage.maxPeople) {
        throw new BadRequestException(
          `El número máximo de personas para este tour es ${tourPackage.maxPeople}`,
        );
      }

      // Verificar fecha futura
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (newStartDate <= today) {
        throw new BadRequestException('La fecha de inicio debe ser futura');
      }

      // Calcular nueva fecha de fin
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + tourPackage.duration);

      // Calcular nuevo precio total
      const newTotalPrice = new Decimal(tourPackage.price.toString())
        .mul(newNumberOfPeople)
        .toNumber();

      updateData.startDate = newStartDate;
      updateData.endDate = newEndDate;
      updateData.totalPrice = new Decimal(newTotalPrice);
    }

    if (updateBookingDto.status) {
      updateData.status = updateBookingDto.status;
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        tourPackage: {
          select: {
            title: true,
            location: true,
            duration: true,
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
    });

    return updatedBooking;
  }

  async cancel(id: string, userId?: string, isAdmin: boolean = false) {
    const booking = await this.findOne(id, userId, isAdmin);

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Esta reserva ya está cancelada');
    }

    if (booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'No se puede cancelar una reserva completada',
      );
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        tourPackage: {
          select: {
            title: true,
            location: true,
          },
        },
      },
    });
  }

  // Método auxiliar para calcular número de personas desde el precio
  private getNumberOfPeopleFromPrice(
    totalPrice: Decimal,
    unitPrice: Decimal,
  ): number {
    return Math.round(totalPrice.toNumber() / unitPrice.toNumber());
  }

  // Método para verificar disponibilidad
  async checkAvailability(
    tourPackageId: string,
    startDate: string,
    numberOfPeople: number,
  ) {
    const tourPackage = await this.prisma.tourPackage.findUnique({
      where: { id: tourPackageId },
    });

    if (!tourPackage) {
      throw new NotFoundException('Paquete turístico no encontrado');
    }

    return {
      available: numberOfPeople <= tourPackage.maxPeople,
      maxCapacity: tourPackage.maxPeople,
      requestedPeople: numberOfPeople,
    };
  }
}
