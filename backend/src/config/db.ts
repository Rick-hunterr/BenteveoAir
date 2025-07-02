import { DataSource } from "typeorm"
import { Usuario } from "../models/Usuario"
import { Ubicacion } from "../models/Ubicacion"
import { Producto } from "../models/Producto"
import { Servicio } from "../models/Servicio"
import { DestinoVuelo } from "../models/DestinoVuelo"
import { Orden } from "../models/Orden"
import { DetalleOrden } from "../models/DetalleOrden"
import * as dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Usuario,
    Ubicacion,
    Producto,
    Servicio,
    DestinoVuelo,
    Orden,
    DetalleOrden,
  ],
})
