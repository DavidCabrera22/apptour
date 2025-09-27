import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTourPackageDto,
  UpdateTourPackageDto,
} from '../tour-packages/dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TourPackagesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createDto: CreateTourPackageDto,
    imageFile?: Express.Multer.File,
  ) {
    const data = {
      title: createDto.title,
      description: createDto.description,
      price: parseFloat(createDto.price.toString()),
      duration: parseInt(createDto.duration.toString()),
      maxPeople: parseInt(createDto.maxPeople.toString()),
      location: createDto.location,
      isActive:
        createDto.isActive !== undefined
          ? createDto.isActive === true ||
            (createDto.isActive as any) === 'true'
          : true,
      imageUrl: imageFile
        ? `/uploads/tour-packages/${imageFile.filename}`
        : createDto.imageUrl || null,
    };

    const tourPackage = await this.prisma.tourPackage.create({
      data,
      include: {
        itinerary: true,
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    return tourPackage;
  }

  async findAll(page = 1, limit = 10, search?: string, location?: string) {
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(location && {
        location: { contains: location, mode: 'insensitive' as const },
      }),
    };

    const [tourPackages, total] = await Promise.all([
      this.prisma.tourPackage.findMany({
        where,
        skip,
        take: limit,
        include: {
          itinerary: true,
          _count: {
            select: {
              bookings: true,
              reviews: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tourPackage.count({ where }),
    ]);

    return {
      tourPackages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const tourPackage = await this.prisma.tourPackage.findUnique({
      where: { id },
      include: {
        itinerary: { orderBy: { day: 'asc' } },
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    if (!tourPackage) {
      throw new NotFoundException('Paquete turístico no encontrado');
    }

    return tourPackage;
  }

  async update(
    id: string,
    updateDto: UpdateTourPackageDto,
    imageFile?: Express.Multer.File,
  ) {
    const existingPackage = await this.findOne(id);

    // Si hay nueva imagen, eliminar la anterior
    if (imageFile && existingPackage.imageUrl) {
      const oldImagePath = path.join(process.cwd(), existingPackage.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const data = {
      ...updateDto,
      ...(updateDto.price && { price: parseFloat(updateDto.price.toString()) }),
      ...(imageFile && {
        imageUrl: `/uploads/tour-packages/${imageFile.filename}`,
      }),
    };

    const updatedPackage = await this.prisma.tourPackage.update({
      where: { id },
      data,
      include: {
        itinerary: true,
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    return {
      tourPackage: updatedPackage,
      message: 'Paquete turístico actualizado exitosamente',
    };
  }

  async remove(id: string) {
    const tourPackage = await this.findOne(id);

    // Verificar si tiene reservas activas
    const activeBookings = await this.prisma.booking.count({
      where: {
        tourPackageId: id,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (activeBookings > 0) {
      throw new BadRequestException(
        'No se puede eliminar un paquete con reservas activas',
      );
    }

    // Eliminar imagen si existe
    if (tourPackage.imageUrl) {
      const imagePath = path.join(process.cwd(), tourPackage.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.prisma.tourPackage.delete({ where: { id } });

    return {
      message: 'Paquete turístico eliminado exitosamente',
    };
  }

  async toggleActive(id: string) {
    const tourPackage = await this.findOne(id);
    const updated = await this.prisma.tourPackage.update({
      where: { id },
      data: { isActive: !tourPackage.isActive },
    });

    return {
      tourPackage: updated,
      message: `Paquete ${updated.isActive ? 'activado' : 'desactivado'} exitosamente`,
    };
  }
}
