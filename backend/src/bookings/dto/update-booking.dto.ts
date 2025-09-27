import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    description: 'Estado de la reserva',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
