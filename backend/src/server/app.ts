import express from "express"
import cors from "cors"
import usuarioRoutes from "../routes/usuario.routes";
import ubicacionRoutes from "../routes/ubicacion.routes"
import productoRoutes from "../routes/producto.routes"
import destinoVueloRoutes from "../routes/destinoVuelo.routes"
import servicioRoutes from "../routes/servicio.routes";
import ordenRoutes from "../routes/orden.routes";
import detalleOrdenRoutes from "../routes/detalleOrden.routes";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/usuarios", usuarioRoutes);
app.use("/ubicaciones", ubicacionRoutes)
app.use("/productos", productoRoutes)
app.use("/api/destinos", destinoVueloRoutes)
app.use("/servicios", servicioRoutes)
app.use("/ordenes", ordenRoutes)
app.use("/detalle/ordenes", detalleOrdenRoutes)


export default app
