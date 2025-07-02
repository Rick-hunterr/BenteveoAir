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
        const { precioMin, precioMax, servicioNombre, destinoId } = req.query

        const query = repo.createQueryBuilder("producto")
            .leftJoinAndSelect("producto.servicio", "servicio")
            .leftJoinAndSelect("producto.destinoVuelo", "destinoVuelo")

        if (precioMin) {
            query.andWhere("producto.precio >= :precioMin", { precioMin: Number(precioMin) })
        }

        if (precioMax) {
            query.andWhere("producto.precio <= :precioMax", { precioMax: Number(precioMax) })
        }

        if (servicioNombre) {
            query.andWhere("servicio.nombre = :servicioNombre", { servicioNombre: String(servicioNombre) })
        }

        if (destinoId) {
            query.andWhere("destinoVuelo.id = :destinoId", { destinoId: Number(destinoId) })
        }

        const productos = await query.getMany()
        res.json(productos)
    } catch (error) {
        console.error("Error al obtener productos:", error)
        res.status(500).json({ error: "Error al obtener productos" })
    }
}

export async function obtenerProductoPorId(req: Request, res: Response) {
    const { id } = req.params

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido")
        return
    }

    try {
        const producto = await repo.findOne({
            where: { id: Number(id) },
            relations: ["servicio", "destinoVuelo"],
        })

        if (!producto) {
            res.status(404).send("Producto no encontrado")
            return
        }

        res.json(producto)
    } catch (error) {
        console.error("Error al obtener producto por ID:", error)
        res.status(500).json({ error: "Error al obtener producto" })
    }
}


export async function crearProducto(req: Request, res: Response) {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const duracion = req.body.duracion
    const fecha = req.body.fecha
    const imagen = req.body.imagen
    const hotel = req.body.hotel
    const descuento = req.body.descuento
    const calificacion = req.body.calificacion
    const precio = req.body.precio
    const servicioId = req.body.servicioId
    const destinoVueloId = req.body.destinoVueloId

    try {
        let servicio = null
        if (servicioId) {
            servicio = await repoServicio.findOneBy({ id: servicioId })
            if (!servicio) {
                res.status(400).json({ error: "Servicio no encontrado" })
                return
            }
        }

        let destinoVuelo = null
        if (destinoVueloId) {
            destinoVuelo = await repoDestino.findOneBy({ id: destinoVueloId })
            if (!destinoVuelo) {
                res.status(400).json({ error: "Destino de vuelo no encontrado" })
                return
            }
        }

        const nuevoProducto = repo.create({
            nombre: nombre,
            descripcion: descripcion,
            duracion: duracion,
            fecha: fecha,
            imagen: imagen,
            hotel: hotel,
            descuento: descuento,
            calificacion: calificacion,
            precio: precio,
            servicio: servicio,
            destinoVuelo: destinoVuelo
        })

        const resultado = await repo.save(nuevoProducto)
        res.status(201).json(resultado)

    } catch (error) {
        console.error("Error al crear producto:", error)
        res.status(500).json({ error: "Error al crear producto", details: error })
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

export async function actualizarProducto(req: Request, res: Response) {
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

        const { servicioId, destinoVueloId, ...data } = req.body

        if (servicioId) {
            const servicio = await repoServicio.findOneBy({ id: servicioId })
            if (servicio) {
                producto.servicio = servicio
            }
        }

        if (destinoVueloId) {
            const destinoVuelo = await repoDestino.findOneBy({ id: destinoVueloId })
            if (destinoVuelo) {
                producto.destinoVuelo = destinoVuelo
            }
        }

        Object.assign(producto, data)

        const resultado = await repo.save(producto)
        res.json(resultado)
    } catch (error) {
        console.error("Error al actualizar producto:", error)
        res.status(400).json({ error: "Error al actualizar producto" })
    }
}

