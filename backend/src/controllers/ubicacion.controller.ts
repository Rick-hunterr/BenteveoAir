import { Request, Response } from "express"
import { AppDataSource } from "../config/db"
import { Ubicacion } from "../models/Ubicacion"

const repo = AppDataSource.getRepository(Ubicacion)

export const obtenerUbicaciones = async (req: Request, res: Response) => {
  const ubicaciones = await repo.find()
  res.json(ubicaciones)
}

export const crearUbicacion = async (req: Request, res: Response) => {
  try {
    const ubicacion = repo.create(req.body)
    const resultado = await repo.save(ubicacion)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ error: "Error al crear ubicación" })
  }
}
