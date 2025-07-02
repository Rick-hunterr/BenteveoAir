### Obtener Usuarios
GET http://localhost:3000/usuarios
Content-Type: application/json

###

### Crear Usuario
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Ana Gómez",
  "email": "ana@example.com",
  "contraseña": "1234",
  "rol": "cliente",
  "ubicacionId": 1
}

###

### Actualizar Usuario
PUT http://localhost:3000/usuarios/1
Content-Type: application/json

{
  "nombre": "Ana Actualizada",
  "email": "ana_actualizada@example.com",
  "contraseña": "4321",
  "rol": "cliente",
  "ubicacion": { "id": 1 }
}

###

### Eliminar Usuario
DELETE http://localhost:3000/usuarios/1

###

### Obtener Ubicaciones
GET http://localhost:3000/ubicaciones
Content-Type: application/json

###

### Crear Ubicacion
POST http://localhost:3000/ubicaciones
Content-Type: application/json

{
  "ciudad": "Buenos Aires",
  "pais": "Argentina"
}

###

### Eliminar Ubicacion
DELETE http://localhost:3000/ubicaciones/1

###

### Obtener DestinoVuelos
GET http://localhost:3000/destinovuelos
Content-Type: application/json

###

### Crear DestinoVuelo
POST http://localhost:3000/destinovuelos
Content-Type: application/json

{
  "origenId": 1,
  "destinoId": 2
}

###

### Actualizar DestinoVuelo
PUT http://localhost:3000/destinovuelos/1
Content-Type: application/json

{
  "origenId": 2,
  "destinoId": 3
}

###

### Eliminar DestinoVuelo
DELETE http://localhost:3000/destinovuelos/1

###

### Obtener Servicios
GET http://localhost:3000/servicios
Content-Type: application/json

###

### Crear Servicio
POST http://localhost:3000/servicios
Content-Type: application/json

{
  "nombre": "WiFi",
  "descripcion": "Servicio de internet a bordo"
}

###

### Actualizar Servicio
PUT http://localhost:3000/servicios/1
Content-Type: application/json

{
  "nombre": "WiFi Premium",
  "descripcion": "Internet ultra rápido a bordo"
}

###

### Eliminar Servicio
DELETE http://localhost:3000/servicios/1

###

### Obtener Productos
GET http://localhost:3000/productos
Content-Type: application/json

###

### Crear Producto
POST http://localhost:3000/productos
Content-Type: application/json

{
  "nombre": "Pasaje VIP",
  "descripcion": "Pasaje con asientos premium",
  "precio": 1200.50,
  "servicioId": 1,
  "destinoVueloId": 1
}

###

### Actualizar Producto
PUT http://localhost:3000/productos/1
Content-Type: application/json

{
  "nombre": "Pasaje VIP Plus",
  "descripcion": "Asientos premium y comida incluida",
  "precio": 1500.00,
  "servicioId": 1,
  "destinoVueloId": 1
}

###

### Eliminar Producto
DELETE http://localhost:3000/productos/1

###

### Obtener Ordenes
GET http://localhost:3000/ordenes
Content-Type: application/json

###

### Crear Orden
POST http://localhost:3000/ordenes
Content-Type: application/json

{
  "usuarioId": 1,
  "estado": "pendiente"
}

###

### Actualizar Orden
PUT http://localhost:3000/ordenes/1
Content-Type: application/json

{
  "estado": "completada"
}

###

### Eliminar Orden
DELETE http://localhost:3000/ordenes/1

###

### Obtener DetalleOrden
GET http://localhost:3000/detalleorden
Content-Type: application/json

###

### Crear DetalleOrden
POST http://localhost:3000/detalleorden
Content-Type: application/json

{
  "ordenId": 1,
  "productoId": 1,
  "cantidad": 2,
  "precio": 2400.00
}

###

### Actualizar DetalleOrden
PUT http://localhost:3000/detalleorden/1
Content-Type: application/json

{
  "cantidad": 3
}

###

### Eliminar DetalleOrden
DELETE http://localhost:3000/detalleorden/1
