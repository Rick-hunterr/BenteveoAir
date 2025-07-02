import { Request, Response } from "express"
import { AppDataSource } from "../config/db"
import { Usuario } from "../models/Usuario"
import { Ubicacion } from "../models/Ubicacion"

const repo = AppDataSource.getRepository(Usuario)
const repoUbicacion = AppDataSource.getRepository(Ubicacion)

export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await repo.find({ relations: ["ubicacion"] })
    res.status(200).json(usuarios)
  } catch (error) {
    console.error("ERROR al obtener usuarios:", error)
    res.status(500).json({ error: "Error al obtener usuarios" })
  }
}

export async function crearUsuario(req: Request, res: Response) {
  try {
    const ubicacionData = req.body.ubicacion

    let ubicacion = null
    if (ubicacionData) {

      if (ubicacionData.id) {
        ubicacion = await repoUbicacion.findOneBy({ id: ubicacionData.id })
        if (!ubicacion) {
          res.status(400).send("Ubicación no encontrada")
          return
        }
      } else {

        ubicacion = repoUbicacion.create(ubicacionData)
        await repoUbicacion.save(ubicacion)
      }
    }

    const usuarioData = { ...req.body }
    delete usuarioData.ubicacion

    const usuario = repo.create({ ...usuarioData, ubicacion })
    const resultado = await repo.save(usuario)

    res.status(201).json(resultado)
  } catch (error) {
    console.error("ERROR al crear usuario:", error)
    res.status(400).json({ error: "Error al crear usuario" })
  }
}

export async function eliminarUsuario(req: Request, res: Response) {
  const { id } = req.params

  if (isNaN(Number(id))) {
    res.status(400).send("ID inválido")
    return
  }

  try {
    const usuario = await repo.findOneBy({ id: Number(id) })

    if (!usuario) {
      res.status(404).send("Usuario no encontrado")
      return
    }

    await repo.remove(usuario)
    res.status(204).send()
  } catch (error) {
    console.error("ERROR al eliminar usuario:", error)
    res.status(500).send("Error al eliminar usuario")
  }
}

export async function actualizarUsuario(req: Request, res: Response) {
  const { id } = req.params

  if (isNaN(Number(id))) {
    res.status(400).send("ID inválido")
    return
  }

  try {
    const usuario = await repo.findOneBy({ id: Number(id) })

    if (!usuario) {
      res.status(404).send("Usuario no encontrado")
      return
    }

    const updatedData = req.body
    if (updatedData.ubicacion) {
      const ubicacion = await repoUbicacion.findOneBy({ id: updatedData.ubicacion.id })
      if (!ubicacion) {
        res.status(400).send("Ubicación no encontrada")
        return
      }
      updatedData.ubicacion = ubicacion
    }

    Object.assign(usuario, updatedData)
    const resultado = await repo.save(usuario)

    res.status(200).json(resultado)
  } catch (error) {
    console.error("ERROR al actualizar usuario:", error)
    res.status(500).send("Error al actualizar usuario")
  }
}
