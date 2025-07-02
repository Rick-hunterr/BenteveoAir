import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Orden } from "../models/Orden";
import { Usuario } from "../models/Usuario";

const repoOrden = AppDataSource.getRepository(Orden);
const repoUsuario = AppDataSource.getRepository(Usuario);

export async function obtenerOrdenes(req: Request, res: Response) {
    try {
        const ordenes = await repoOrden.find({
            relations: ["usuario"]
        });
        res.json(ordenes);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({ error: "Error al obtener órdenes" });
    }
}

export async function crearOrden(req: Request, res: Response) {
    try {
        const { usuarioId, ...data } = req.body;
        const usuario = await repoUsuario.findOneBy({ id: usuarioId });
        const orden = repoOrden.create({ ...data, usuario });
        const resultado = await repoOrden.save(orden);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error al crear orden:", error);
        res.status(400).json({ error: "Error al crear orden" });
    }
}

export async function eliminarOrden(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido");
        return;
    }

    try {
        const orden = await repoOrden.findOneBy({ id: Number(id) });
        if (!orden) {
            res.status(404).send("Orden no encontrada");
            return;
        }
        await repoOrden.remove(orden);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar orden:", error);
        res.status(500).json({ error: "Error al eliminar orden" });
    }
}
