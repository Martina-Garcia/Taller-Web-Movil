import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
// Asumiendo que crearás un DTO para el Login
import { LoginDto } from './dto/login.dto'; 

@ApiTags('Auth') // Agrupa estos endpoints bajo la categoría "Auth"
@Controller('auth')
export class AuthController {

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión en el sistema PickMart' })
  @ApiBody({ type: LoginDto, description: 'Credenciales del usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna el token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() loginDto: LoginDto) {
    // Lógica de login
    return { token: 'jwt_token_example', rol: 'Admin' };
  }

  @Get('admin/dashboard')
  @ApiBearerAuth() // Indica que este endpoint requiere un Token en Swagger
  @ApiOperation({ summary: 'Obtener datos exclusivos para administradores' })
  @ApiResponse({ status: 200, description: 'Datos del dashboard obtenidos con éxito.' })
  @ApiResponse({ status: 403, description: 'No tienes permisos de Administrador.' })
  getAdminData() {
    // Lógica de dashboard admin
    return { message: 'Bienvenido Administrador' };
  }
}