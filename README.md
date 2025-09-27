# AppTour - Sistema de Turismo

Una aplicación completa de turismo con backend en NestJS y frontend en Next.js, que permite gestionar paquetes turísticos, reservas, pagos y carritos de compra.

## 🏗️ Arquitectura del Proyecto


## 🚀 Configuración y Ejecución

### Backend (API)

#### Requisitos Previos
- Node.js 18+
- PostgreSQL
- npm o yarn

#### Variables de Entorno
Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/apptour_db"

# JWT Secret (genera una clave segura)
JWT_SECRET="tu-clave-secreta-muy-segura-aqui"

# Puerto del servidor (opcional, por defecto 3001)
PORT=3001
```

#### Instalación y Ejecución

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar la base de datos
npx prisma generate
npx prisma db push

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en:
- **API**: http://localhost:3001
- **Documentación Swagger**: http://localhost:3001/api

### Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

## 📚 Documentación de la API

### Base URL



### Autenticación
La API utiliza JWT (JSON Web Tokens) para autenticación. Incluye el token en el header:


---

## 🔐 Endpoints de Autenticación (`/auth`)

### POST `/auth/register`
Registrar un nuevo usuario.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Respuesta:**
```json
{
  "user": {
    "id": "cuid-generado",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "CLIENT",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt-token-aqui",
  "message": "Usuario registrado exitosamente"
}
```

### POST `/auth/login`
Iniciar sesión.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "user": {
    "id": "cuid-generado",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "CLIENT"
  },
  "token": "jwt-token-aqui",
  "message": "Login exitoso"
}
```

### GET `/auth/profile` 🔒
Obtener perfil del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

**Respuesta:**
```json
{
  "id": "cuid-generado",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "CLIENT",
  "isActive": true
}
```

### GET `/auth/me` 🔒
Verificar autenticación actual.

**Headers:** `Authorization: Bearer <token>`

### POST `/auth/create-super-admin`
Crear el primer SUPER_ADMIN del sistema.

**Body:**
```json
{
  "email": "admin@ejemplo.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "Sistema"
}
```

### POST `/auth/promote-user` 🔒 (Solo SUPER_ADMIN)
Promover usuario a un rol superior.

**Headers:** `Authorization: Bearer <super-admin-token>`

**Body:**
```json
{
  "userId": "cuid-del-usuario",
  "newRole": "ADMIN"
}
```

---

## 🎒 Endpoints de Paquetes Turísticos (`/tour-packages`)

### GET `/tour-packages`
Obtener todos los paquetes turísticos activos.

**Query Parameters:**
- `page` (opcional): Número de página
- `limit` (opcional): Elementos por página
- `search` (opcional): Búsqueda por título
- `location` (opcional): Filtrar por ubicación

**Respuesta:**
```json
{
  "data": [
    {
      "id": "cuid-generado",
      "title": "Aventura en Samaná",
      "description": "Descubre las bellezas naturales...",
      "price": "150.00",
      "duration": 3,
      "maxPeople": 8,
      "location": "Samaná",
      "imageUrl": "https://ejemplo.com/imagen.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "itinerary": [
        {
          "day": 1,
          "title": "Llegada y bienvenida",
          "description": "Recepción en el hotel..."
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### GET `/tour-packages/:id`
Obtener un paquete turístico específico.

**Respuesta:**
```json
{
  "id": "cuid-generado",
  "title": "Aventura en Samaná",
  "description": "Descubre las bellezas naturales...",
  "price": "150.00",
  "duration": 3,
  "maxPeople": 8,
  "location": "Samaná",
  "imageUrl": "https://ejemplo.com/imagen.jpg",
  "itinerary": [
    {
      "day": 1,
      "title": "Llegada y bienvenida",
      "description": "Recepción en el hotel..."
    }
  ],
  "reviews": [
    {
      "id": "review-id",
      "rating": 5,
      "comment": "Excelente experiencia",
      "user": {
        "firstName": "María",
        "lastName": "González"
      }
    }
  ]
}
```

### POST `/tour-packages` 🔒 (Solo ADMIN/SUPER_ADMIN)
Crear nuevo paquete turístico.

**Headers:** 
- `Authorization: Bearer <admin-token>`
- `Content-Type: multipart/form-data`

**Body (FormData):**



### PATCH `/tour-packages/:id` 🔒 (Solo ADMIN/SUPER_ADMIN)
Actualizar paquete turístico.

### DELETE `/tour-packages/:id` 🔒 (Solo ADMIN/SUPER_ADMIN)
Eliminar paquete turístico.

---

## 🛒 Endpoints del Carrito (`/cart`)

### GET `/cart` 🔒
Obtener carrito del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

**Respuesta:**
```json
{
  "items": [
    {
      "id": "cart-item-id",
      "quantity": 2,
      "tourPackage": {
        "id": "package-id",
        "title": "Aventura en Samaná",
        "price": "150.00",
        "imageUrl": "https://ejemplo.com/imagen.jpg"
      }
    }
  ],
  "total": "300.00"
}
```

### POST `/cart` 🔒
Agregar item al carrito.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "tourPackageId": "package-id",
  "quantity": 1
}
```

### PUT `/cart/:id` 🔒
Actualizar cantidad de item en el carrito.

**Body:**
```json
{
  "quantity": 3
}
```

### DELETE `/cart/:id` 🔒
Eliminar item del carrito.

### DELETE `/cart` 🔒
Vaciar carrito completo.

---

## 📅 Endpoints de Reservas (`/bookings`)

### GET `/bookings` 🔒
Obtener reservas del usuario (o todas si es admin).

**Headers:** `Authorization: Bearer <token>`

**Respuesta:**
```json
{
  "data": [
    {
      "id": "booking-id",
      "startDate": "2024-06-01T00:00:00.000Z",
      "endDate": "2024-06-04T00:00:00.000Z",
      "totalPrice": "450.00",
      "status": "CONFIRMED",
      "tourPackage": {
        "title": "Aventura en Samaná",
        "location": "Samaná"
      },
      "payment": {
        "status": "COMPLETED",
        "method": "CREDIT_CARD"
      }
    }
  ]
}
```

### POST `/bookings` 🔒
Crear nueva reserva.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "tourPackageId": "package-id",
  "startDate": "2024-06-01",
  "endDate": "2024-06-04",
  "totalPrice": 450.00
}
```

### GET `/bookings/:id` 🔒
Obtener reserva específica.

### PATCH `/bookings/:id` 🔒 (Solo ADMIN/SUPER_ADMIN)
Actualizar estado de reserva.

**Body:**
```json
{
  "status": "CONFIRMED"
}
```

---

## 💳 Endpoints de Pagos (`/payments`)

### GET `/payments` 🔒
Obtener pagos del usuario (o todos si es admin).

**Headers:** `Authorization: Bearer <token>`

### POST `/payments` 🔒
Procesar pago de una reserva.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "bookingId": "booking-id",
  "amount": 450.00,
  "method": "CREDIT_CARD",
  "cardDetails": {
    "number": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cvv": "123"
  }
}
```

### GET `/payments/stats` 🔒 (Solo ADMIN/SUPER_ADMIN)
Obtener estadísticas de pagos.

### GET `/payments/:id` 🔒
Obtener pago específico.

### PATCH `/payments/:id` 🔒 (Solo ADMIN/SUPER_ADMIN)
Actualizar estado de pago.

### POST `/payments/:id/refund` 🔒 (Solo ADMIN/SUPER_ADMIN)
Procesar reembolso.

---

## 👥 Roles y Permisos

### CLIENT (Cliente)
- Registrarse y hacer login
- Ver paquetes turísticos
- Gestionar su carrito
- Crear y ver sus reservas
- Realizar pagos
- Ver su perfil

### ADMIN (Administrador)
- Todos los permisos de CLIENT
- Crear, editar y eliminar paquetes turísticos
- Ver todas las reservas
- Gestionar pagos y reembolsos
- Ver estadísticas

### SUPER_ADMIN (Super Administrador)
- Todos los permisos de ADMIN
- Promover usuarios a ADMIN
- Acceso completo al sistema

---

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

#### users
- `id`: Identificador único
- `email`: Email único del usuario
- `password`: Contraseña hasheada
- `firstName`, `lastName`: Nombres
- `role`: CLIENT | ADMIN | SUPER_ADMIN
- `isActive`: Estado del usuario

#### tour_packages
- `id`: Identificador único
- `title`: Título del paquete
- `description`: Descripción detallada
- `price`: Precio decimal
- `duration`: Duración en días
- `maxPeople`: Máximo de personas
- `location`: Ubicación
- `imageUrl`: URL de la imagen
- `isActive`: Estado del paquete

#### bookings
- `id`: Identificador único
- `userId`: Referencia al usuario
- `tourPackageId`: Referencia al paquete
- `startDate`, `endDate`: Fechas del viaje
- `totalPrice`: Precio total
- `status`: PENDING | CONFIRMED | CANCELLED | COMPLETED

#### payments
- `id`: Identificador único
- `bookingId`: Referencia a la reserva
- `amount`: Monto del pago
- `method`: CREDIT_CARD | DEBIT_CARD | PAYPAL | BANK_TRANSFER
- `status`: PENDING | COMPLETED | FAILED | REFUNDED

#### cart_items
- `id`: Identificador único
- `userId`: Referencia al usuario
- `tourPackageId`: Referencia al paquete
- `quantity`: Cantidad de items

---

## 🔧 Comandos Útiles

### Desarrollo
```bash
# Ejecutar backend en modo desarrollo
cd backend && npm run start:dev

# Ejecutar frontend en modo desarrollo
cd frontend && npm run dev

# Ver logs de la base de datos
cd backend && npx prisma studio
```

### Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Aplicar cambios al esquema
npx prisma db push

# Ver datos en interfaz web
npx prisma studio

# Resetear base de datos (¡CUIDADO!)
npx prisma db push --force-reset
```

### Producción
```bash
# Construir backend
cd backend && npm run build

# Construir frontend
cd frontend && npm run build
```

---

## 🐛 Solución de Problemas Comunes

### Error de conexión a la base de datos
1. Verifica que PostgreSQL esté ejecutándose
2. Confirma que la `DATABASE_URL` en `.env` sea correcta
3. Ejecuta `npx prisma db push` para sincronizar el esquema

### Error de autenticación JWT
1. Verifica que `JWT_SECRET` esté configurado en `.env`
2. Asegúrate de incluir el token en el header `Authorization`
3. Verifica que el token no haya expirado (24h por defecto)

### Error de CORS
El backend está configurado para aceptar requests desde cualquier origen en desarrollo. En producción, configura los orígenes permitidos.

### Error de subida de archivos
Verifica que el directorio `uploads/` tenga permisos de escritura.

---

## 📞 Soporte

Para cualquier duda sobre la implementación del backend:

1. Revisa la documentación Swagger en `/api`
2. Consulta los logs del servidor
3. Verifica la configuración de variables de entorno
4. Usa Prisma Studio para inspeccionar la base de datos

---

## 🚀 Despliegue

### Variables de Entorno para Producción
```env
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/database"
JWT_SECRET="clave-super-secreta-para-produccion"
PORT=3001
NODE_ENV=production
```

### Docker (Opcional)
```bash
# Construir imagen
docker build -t apptour-backend ./backend

# Ejecutar contenedor
docker run -p 3001:3001 --env-file .env apptour-backend
```

---



¿

