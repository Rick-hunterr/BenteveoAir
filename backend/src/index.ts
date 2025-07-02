import "reflect-metadata"
import { AppDataSource } from "./db"
import app from "./app"

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada")
    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000")
    })
  })
  .catch((err) => console.error(err))
