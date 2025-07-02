import { Request, Response } from "express"
import { AppDataSource } from "../db"
import { Usuario } from "../models/Usuario"
import { Ubicacion } from "../models/Ubicacion"

const repo = AppDataSource.getRepository(Usuario)
const repoUbicacion = AppDataSource.getRepository(Ubicacion)

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await repo.find({ relations: ["ubicacion"] })
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" })
  }
}

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const ubicacion = await repoUbicacion.save(req.body.ubicacion)
    const usuario = repo.create({ ...req.body, ubicacion })
    const resultado = await repo.save(usuario)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ error: "Error al crear usuario" })
  }
}
