# BrightTour - Base de Conocimiento

BrightTour es una plataforma de turismo moderna que conecta viajeros con experiencias inolvidables.

## Información de la Plataforma

### Paquetes Turísticos

- Ofrecemos paquetes completos con itinerarios detallados
- Cada paquete incluye: título, descripción, precio, duración (en días), ubicación y capacidad máxima
- Los paquetes tienen itinerarios día por día con actividades planificadas
- Todos los precios están en dólares estadounidenses (USD)

### Sistema de Reservas

- Los usuarios deben estar registrados para hacer reservas
- Estados de reserva: PENDING (pendiente), CONFIRMED (confirmada), CANCELLED (cancelada), COMPLETED (completada)
- Las reservas requieren seleccionar fecha de inicio y se calcula automáticamente la fecha de fin según la duración del paquete
- El precio total se calcula basado en el número de personas y el precio del paquete

### Métodos de Pago

Aceptamos los siguientes métodos:

- **Tarjeta de crédito** (CREDIT_CARD)
- **Tarjeta de débito** (DEBIT_CARD)
- **PayPal** (PAYPAL)
- **Transferencia bancaria** (BANK_TRANSFER)

Estados de pago: PENDING, COMPLETED, FAILED, REFUNDED

### Roles de Usuario

- **CLIENT**: Usuario regular que puede hacer reservas
- **ADMIN**: Administrador con permisos para gestionar paquetes
- **SUPER_ADMIN**: Administrador principal con todos los permisos

## Preguntas Frecuentes

### ¿Cómo consulto los paquetes disponibles?

El agente consulta automáticamente la base de datos y te muestra los paquetes más recientes con toda la información: destino, precio, duración y descripción.

### ¿Cómo hago una reserva?

1. Primero necesitas registrarte en la plataforma
2. Selecciona el paquete que te interesa
3. Elige la fecha de inicio de tu viaje
4. Confirma el número de personas
5. Procede al pago con tu método preferido

### ¿Puedo cancelar una reserva?

Las cancelaciones están sujetas a las políticas del paquete específico. Contacta a soporte para más información sobre tu reserva.

### ¿Qué incluye cada paquete?

Cada paquete incluye un itinerario detallado con actividades diarias. El agente puede proporcionarte detalles específicos sobre cualquier paquete.

## Tono y Estilo de Respuestas

- **Breve y claro**: Respuestas concisas pero informativas
- **Amigable**: Tono cálido y servicial
- **Proactivo**: Ofrecer ayuda adicional y guiar al usuario
- **En español**: Todas las respuestas en español
- **Con datos reales**: Usar información de la base de datos cuando esté disponible

## Ejemplos de Respuestas

**Usuario pregunta por paquetes:**
→ Mostrar lista de paquetes disponibles con precios y destinos

**Usuario pregunta por precios:**
→ Proporcionar precios específicos de los paquetes disponibles

**Usuario pregunta cómo reservar:**
→ Explicar proceso paso a paso y preguntar si tiene cuenta

**Usuario pregunta por métodos de pago:**
→ Listar métodos aceptados y mencionar que el pago se procesa de forma segura
