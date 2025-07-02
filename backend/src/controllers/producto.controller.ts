import { Request, Response } from "express"
import { AppDataSource } from "../config/db"
import { Producto } from "../models/Producto"
import { Servicio } from "../models/Servicio"
import { DestinoVuelo } from "../models/DestinoVuelo"

const repo = AppDataSource.getRepository(Producto)
const repoServicio = AppDataSource.getRepository(Servicio)
const repoDestino = AppDataSource.getRepository(DestinoVuelo)

export async function obtenerProductos(req: Request, res: Response) {
    try {
        const productos = await repo.find({ relations: ["servicio", "destinoVuelo"] })
        res.json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" })
    }
}

export async function crearProducto(req: Request, res: Response) {
    try {
        const { servicioId, destinoVueloId, ...data } = req.body

        const servicio = await repoServicio.findOneBy({ id: servicioId })
        const destinoVuelo = await repoDestino.findOneBy({ id: destinoVueloId })

        const producto = repo.create({
            ...data,
            servicio,
            destinoVuelo,
        })

        const resultado = await repo.save(producto)
        res.status(201).json(resultado)
    } catch (error) {
        console.error("Error al crear producto:", error)
        res.status(400).json({ error: "Error al crear producto" })
    }
}

export async function eliminarProducto(req: Request, res: Response) {
    const { id } = req.params

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido")
        return  
    }
    try {
        const producto = await repo.findOneBy({ id: Number(id) })
        if (!producto) {
            res.status(404).send("Producto no encontrado")
            return
        }
        await repo.remove(producto)
        res.status(204).send()
    } catch (error) {
        console.error("Error al eliminar producto:", error)
        res.status(500).json({ error: "Error al eliminar producto" })
    }
}
