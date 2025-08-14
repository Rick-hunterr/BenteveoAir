import "reflect-metadata"
import { AppDataSource } from "../config/db"
import app from "./app"

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada")
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch((err) => console.error(err))
