import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar item al carrito' })
  @ApiResponse({
    status: 201,
    description: 'Item agregado al carrito exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Paquete turístico no encontrado' })
  @ApiResponse({ status: 409, description: 'No hay disponibilidad' })
  async addToCart(@Body() addToCartDto: AddToCartDto, @Request() req) {
    return this.cartService.addToCart(addToCartDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener carrito del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Carrito obtenido exitosamente',
  })
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Put(':itemId')
  @ApiOperation({ summary: 'Actualizar item del carrito' })
  @ApiParam({
    name: 'itemId',
    description: 'ID del item del carrito',
    example: 'clp1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Item del carrito actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Item del carrito no encontrado' })
  @ApiResponse({ status: 409, description: 'No hay disponibilidad' })
  async updateCartItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Request() req,
  ) {
    return this.cartService.updateCartItem(
      itemId,
      updateCartItemDto,
      req.user.id,
    );
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Eliminar item del carrito' })
  @ApiParam({
    name: 'itemId',
    description: 'ID del item del carrito',
    example: 'clp1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Item eliminado del carrito exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Item del carrito no encontrado' })
  async removeFromCart(@Param('itemId') itemId: string, @Request() req) {
    return this.cartService.removeFromCart(itemId, req.user.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Limpiar todo el carrito' })
  @ApiResponse({
    status: 200,
    description: 'Carrito limpiado exitosamente',
  })
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Proceder al checkout' })
  @ApiResponse({
    status: 201,
    description: 'Checkout realizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'El carrito está vacío' })
  @ApiResponse({ status: 409, description: 'No hay disponibilidad' })
  async checkout(@Request() req) {
    return this.cartService.checkout(req.user.id);
  }
}
