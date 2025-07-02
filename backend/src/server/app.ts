import express from "express"
import cors from "cors"
import usuarioRoutes from "../routes/usuario.routes";
import ubicacionRoutes from "../routes/ubicacion.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/usuarios", usuarioRoutes);
app.use("/ubicaciones", ubicacionRoutes)

export default app
