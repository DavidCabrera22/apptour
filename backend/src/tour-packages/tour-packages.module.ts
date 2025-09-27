import { Module } from '@nestjs/common';
import { TourPackagesController } from './tour-packages.controller';
import { TourPackagesService } from './tour-packages.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/tour-packages',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `tour-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new Error('Solo se permiten archivos de imagen'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  ],
  controllers: [TourPackagesController],
  providers: [TourPackagesService],
  exports: [TourPackagesService],
})
export class TourPackagesModule {}
