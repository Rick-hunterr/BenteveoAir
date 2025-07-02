import { Request, Response } from "express"
import { AppDataSource } from "../db"
import { Usuario } from "../models/Usuario"
import { Ubicacion } from "../models/Ubicacion"

const repo = AppDataSource.getRepository(Usuario)
const repoUbicacion = AppDataSource.getRepository(Ubicacion)

export const obtenerUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await repo.find({ relations: ["ubicacion"] })
    return res.json(usuarios)
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener usuarios" })
  }
}

export const crearUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ubicacionId, ...data } = req.body

    let ubicacion = null
    if (ubicacionId) {
      ubicacion = await repoUbicacion.findOneBy({ id: ubicacionId })
      if (!ubicacion) return res.status(400).json({ error: "Ubicación inválida" })
    }

    const nuevoUsuario = repo.create({
      ...data,
      ubicacion,
    })

    const resultado = await repo.save(nuevoUsuario)
    return res.status(201).json(resultado)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Error al crear usuario" })
  }
}
