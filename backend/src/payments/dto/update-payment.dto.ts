import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({
    description: 'Estado del pago',
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED,
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
