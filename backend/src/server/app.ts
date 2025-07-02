import express from "express"
import cors from "cors"
import usuarioRoutes from "../routes/usuario.routes";
import ubicacionRoutes from "../routes/ubicacion.routes"
import productoRoutes from "../routes/producto.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/usuarios", usuarioRoutes);
app.use("/ubicaciones", ubicacionRoutes)
app.use("/productos", productoRoutes)


export default app
