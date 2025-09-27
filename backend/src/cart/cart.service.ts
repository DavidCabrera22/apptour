import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Agregar item al carrito
  async addToCart(addToCartDto: AddToCartDto, userId: string) {
    const { tourPackageId, startDate, numberOfPeople } = addToCartDto;

    // Verificar que el paquete turístico existe
    const tourPackage = await this.prisma.tourPackage.findUnique({
      where: { id: tourPackageId },
    });

    if (!tourPackage) {
      throw new NotFoundException('Paquete turístico no encontrado');
    }

    // Verificar que la fecha es futura
    const startDateTime = new Date(startDate);
    if (startDateTime <= new Date()) {
      throw new BadRequestException(
        'La fecha de inicio debe ser posterior a la fecha actual',
      );
    }

    // Verificar disponibilidad
    const isAvailable = await this.checkAvailability(
      tourPackageId,
      startDate,
      numberOfPeople,
    );

    if (!isAvailable) {
      throw new ConflictException(
        'No hay disponibilidad para las fechas y número de personas solicitadas',
      );
    }

    // Verificar si ya existe un item similar en el carrito
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        userId,
        tourPackageId,
      },
    });

    if (existingItem) {
      // Actualizar cantidad si ya existe
      const newQuantity = existingItem.quantity + numberOfPeople;

      // Verificar disponibilidad con la nueva cantidad
      const isStillAvailable = await this.checkAvailability(
        tourPackageId,
        startDate,
        newQuantity,
      );

      if (!isStillAvailable) {
        throw new ConflictException(
          'No hay suficiente disponibilidad para agregar más personas',
        );
      }

      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
        },
        include: {
          tourPackage: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              duration: true,
            },
          },
        },
      });
    }

    // Crear nuevo item en el carrito
    return this.prisma.cartItem.create({
      data: {
        userId,
        tourPackageId,
        quantity: numberOfPeople,
      },
      include: {
        tourPackage: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            duration: true,
          },
        },
      },
    });
  }

  // Obtener carrito del usuario
  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        tourPackage: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            imageUrl: true,
            duration: true,
            location: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalItems = cartItems.length;
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.tourPackage.price) * item.quantity,
      0,
    );

    return {
      items: cartItems.map((item) => ({
        ...item,
        totalPrice: Number(item.tourPackage.price) * item.quantity,
      })),
      summary: {
        totalItems,
        totalAmount,
        currency: 'USD',
      },
    };
  }

  // Actualizar item del carrito
  async updateCartItem(
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
    userId: string,
  ) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: itemId, userId },
      include: { tourPackage: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Item del carrito no encontrado');
    }

    const { quantity } = updateCartItemDto;

    if (quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0');
    }

    // Verificar disponibilidad con la nueva cantidad
    const isAvailable = await this.checkAvailability(
      cartItem.tourPackageId,
      new Date().toISOString(), // Usar fecha actual como placeholder
      quantity,
    );

    if (!isAvailable) {
      throw new ConflictException(
        'No hay disponibilidad para la cantidad solicitada',
      );
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
      },
      include: {
        tourPackage: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            duration: true,
          },
        },
      },
    });
  }

  // Eliminar item del carrito
  async removeFromCart(itemId: string, userId: string) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: itemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundException('Item del carrito no encontrado');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item eliminado del carrito exitosamente' };
  }

  // Limpiar todo el carrito
  async clearCart(userId: string) {
    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { message: 'Carrito limpiado exitosamente' };
  }

  // Proceder al checkout
  async checkout(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        tourPackage: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            duration: true,
            maxPeople: true,
            location: true,
            imageUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('El carrito está vacío');
    }

    const bookings: any[] = [];

    // Crear una reserva por cada item del carrito
    for (const item of cartItems) {
      // Verificar disponibilidad una vez más antes de crear la reserva
      const isAvailable = await this.checkAvailability(
        item.tourPackageId,
        new Date().toISOString().split('T')[0], // Usar fecha actual como placeholder
        item.quantity,
      );

      if (!isAvailable) {
        throw new ConflictException(
          `No hay disponibilidad para ${item.tourPackage.title}`,
        );
      }

      // Calcular fechas (usar fechas por defecto ya que no tenemos startDate en el esquema actual)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Comenzar mañana
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + item.tourPackage.duration);

      // Calcular precio total
      const totalPrice = Number(item.tourPackage.price) * item.quantity;

      // Crear la reserva
      const booking = await this.prisma.booking.create({
        data: {
          userId,
          tourPackageId: item.tourPackageId,
          startDate,
          endDate,
          totalPrice,
          status: 'PENDING',
        },
        include: {
          tourPackage: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              duration: true,
            },
          },
        },
      });

      bookings.push(booking);
    }

    // Limpiar el carrito después del checkout exitoso
    await this.clearCart(userId);

    return {
      message: 'Checkout completado exitosamente',
      bookings,
      totalAmount: bookings.reduce(
        (sum, booking) => sum + Number(booking.totalPrice),
        0,
      ),
    };
  }

  // Verificar disponibilidad (método privado)
  private async checkAvailability(
    tourPackageId: string,
    startDate: string,
    numberOfPeople: number,
  ): Promise<boolean> {
    const tourPackage = await this.prisma.tourPackage.findUnique({
      where: { id: tourPackageId },
    });

    if (!tourPackage) {
      return false;
    }

    // Verificar capacidad máxima (usar maxPeople en lugar de maxCapacity)
    if (numberOfPeople > tourPackage.maxPeople) {
      return false;
    }

    // Contar reservas existentes para la misma fecha
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(startDateTime);
    endDateTime.setDate(endDateTime.getDate() + tourPackage.duration);

    const existingBookings = await this.prisma.booking.findMany({
      where: {
        tourPackageId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            startDate: {
              lte: endDateTime,
            },
            endDate: {
              gte: startDateTime,
            },
          },
        ],
      },
    });

    // Since the current schema doesn't have numberOfPeople in Booking,
    // simplificaremos la verificación usando solo la cantidad de reservas
    const totalBookings = existingBookings.length;

    // Verificar si hay suficiente capacidad (asumiendo 1 persona por booking como simplificación)
    return totalBookings + 1 <= tourPackage.maxPeople;
  }
}
