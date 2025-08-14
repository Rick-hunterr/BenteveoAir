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

const isProduction = process.env.NODE_ENV === "production"

export const AppDataSource = new DataSource(
  isProduction
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL, // Render usa esto
        ssl: { rejectUnauthorized: false },// Render requiere SSL
        synchronize: true, //En producción, esto debería ser false
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
      }
    : {
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
      }
)
