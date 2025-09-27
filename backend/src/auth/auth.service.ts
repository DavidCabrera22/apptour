import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, PromoteUserDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'CLIENT', // Por defecto es cliente
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    // Generar token JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user,
      token,
      message: 'Usuario registrado exitosamente',
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar el usuario
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      throw new UnauthorizedException('Cuenta desactivada');
    }

    // Generar token JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      message: 'Login exitoso',
    };
  }

  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }

  async promoteUser(promoteDto: PromoteUserDto) {
    const { userId, newRole } = promoteDto;

    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Actualizar el rol del usuario
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
      },
    });

    return {
      user: updatedUser,
      message: `Usuario promovido exitosamente a ${newRole}`,
    };
  }

  async createSuperAdmin(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    // Verificar si ya existe un SUPER_ADMIN
    const existingSuperAdmin = await this.prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (existingSuperAdmin) {
      throw new ConflictException('Ya existe un SUPER_ADMIN en el sistema');
    }

    // Verificar si el email ya está registrado
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el SUPER_ADMIN
    const superAdmin = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'SUPER_ADMIN',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      user: superAdmin,
      message: 'SUPER_ADMIN creado exitosamente',
    };
  }
}
