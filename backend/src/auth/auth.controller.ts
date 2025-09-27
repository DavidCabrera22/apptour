import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  PromoteUserDto,
  CreateSuperAdminDto,
} from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req) {
    return {
      user: req.user,
      message: 'Usuario autenticado correctamente',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('promote-user')
  @ApiOperation({ summary: 'Promover usuario a un rol superior' })
  @ApiBearerAuth('JWT-auth')
  async promoteUser(@Request() req, @Body() promoteDto: PromoteUserDto) {
    // Solo SUPER_ADMIN puede promover usuarios
    if (req.user.role !== 'SUPER_ADMIN') {
      throw new UnauthorizedException(
        'Solo SUPER_ADMIN puede promover usuarios',
      );
    }

    return this.authService.promoteUser(promoteDto);
  }

  @Post('create-super-admin')
  @ApiOperation({ summary: 'Crear el primer SUPER_ADMIN del sistema' })
  async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    const { email, password, firstName, lastName } = createSuperAdminDto;
    return this.authService.createSuperAdmin(
      email,
      password,
      firstName,
      lastName,
    );
  }
}
