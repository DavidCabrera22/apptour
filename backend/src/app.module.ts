import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TourPackagesModule } from './tour-packages/tour-packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TourPackagesModule,
    BookingsModule,
    PaymentsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
