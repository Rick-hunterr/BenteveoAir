
    Diagrama para la base de datos:

    // TABLAS PRINCIPALES
    - Usuario
    - Orden
    - DetalleOrden
    - Servicio
    - Ubicacion

    // TABLAS DE RELACIÓN
    - Usuario <-> DetalleOrden (muchos a muchos)
    - DetalleOrden <-> Usuario (muchos a muchos)

    // TABLA DE SERVICIOS
    // id, nombre, descripcion

    // TABLA DE USUARIO
    // id, nombre, email, contraseña, rol_id

    // TABLA DE DETALLE DE ORDEN
    // id, orden_id, producto_id, cantidad, precio

    // TABLA DE ORDEN
    // id, usuario_id, fecha, estado

    // ENTIDADES ADICIONALES
    - Rol
    - Acceso

    // MODELO RELACIÓN-ENTIDAD
    Usuario (id, nombre, email, contraseña, rol_id)
    Rol (id, nombre)
    Orden (id, usuario_id, fecha, estado)
    DetalleOrden (id, orden_id, producto_id, cantidad, precio)
    Producto (id, nombre, descripcion, precio, servicio_id)
    Servicio (id, nombre, descripcion)
    Acceso (id, usuario_id, fecha_hora, tipo)

    // USER STORY (Historia de Usuario)
    Como usuario, quiero poder registrarme, iniciar sesión, realizar pedidos y consultar el estado de mis órdenes.
    Como administrador, quiero gestionar usuarios, productos, servicios y ver reportes de pedidos.

    // DIAGRAMA DE GANTT (Planificación)
    1. Análisis de requerimientos
    2. Diseño de base de datos
    3. Desarrollo backend
    4. Desarrollo frontend
    5. Pruebas y ajustes
    6. Despliegue

    // ROLES DEL EQUIPO
    - Analista profesional
    - Diseñador gráfico
    - Programador (Desarrollador backend O Desarrollador frontend)