import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { DetalleOrden } from "../models/DetalleOrden";
import { Orden } from "../models/Orden";
import { Producto } from "../models/Producto";

const repoDetalle = AppDataSource.getRepository(DetalleOrden);
const repoOrden = AppDataSource.getRepository(Orden);
const repoProducto = AppDataSource.getRepository(Producto);

export async function obtenerDetallesOrden(req: Request, res: Response) {
    try {
        const detalles = await repoDetalle.find({
            relations: ["orden", "producto"]
        });
        res.json(detalles);
    } catch (error) {
        console.error("Error al obtener detalles:", error);
        res.status(500).json({ error: "Error al obtener detalles de orden" });
    }
}

export async function crearDetalleOrden(req: Request, res: Response) {
    const { ordenId, productoId, cantidad } = req.body;

    try {
        const orden = await repoOrden.findOneBy({ id: ordenId });
        if (!orden) {
            throw new Error("Orden no encontrada");
        }

        const producto = await repoProducto.findOneBy({ id: productoId });
        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        const detalle = new DetalleOrden();
        detalle.orden = orden;
        detalle.producto = producto;
        detalle.cantidad = cantidad;

        const resultado = await repoDetalle.save(detalle);
        res.status(201).json(resultado);
    } catch (error) {
        console.log("Error al crear detalle de orden:", error);
        res.status(400).json({ error: "Error al crear detalle de orden" });
    }
}
