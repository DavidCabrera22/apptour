import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID de la reserva a pagar',
    example: 'cmfliogjx0001rkvcyyl1q195',
  })
  @IsString()
  bookingId: string;

  @ApiProperty({
    description: 'Monto a pagar',
    example: 1200000,
    minimum: 1000,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1000, { message: 'El monto mínimo es $1,000 COP' })
  amount: number;

  @ApiProperty({
    description: 'Método de pago',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD,
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({
    description: 'Token de pago de la pasarela (simulado)',
    example: 'tok_1234567890abcdef',
  })
  @IsString()
  paymentToken: string;
}
