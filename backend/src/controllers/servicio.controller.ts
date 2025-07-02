import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Servicio } from "../models/Servicio";

const repo = AppDataSource.getRepository(Servicio);

export async function obtenerServicios(req: Request, res: Response) {
    try {
        const servicios = await repo.find();
        res.json(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        res.status(500).json({ error: "Error al obtener servicios" });
    }
}

export async function crearServicio(req: Request, res: Response) {
    try {
        const nuevoServicio = repo.create(req.body);
        const resultado = await repo.save(nuevoServicio);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error al crear servicio:", error);
        res.status(400).json({ error: "Error al crear servicio" });
    }
}

export async function eliminarServicio(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido");
        return;
    }

    try {
        const servicio = await repo.findOneBy({ id: Number(id) });
        if (!servicio) {
            res.status(404).send("Servicio no encontrado");
            return;
        }
        await repo.remove(servicio);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar servicio:", error);
        res.status(500).json({ error: "Error al eliminar servicio" });
    }    
}

export async function actualizarServicio(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido");
        return;
    }

    try {
        const servicio = await repo.findOneBy({ id: Number(id) });

        if (!servicio) {
            res.status(404).send("Servicio no encontrado");
            return;
        }

        repo.merge(servicio, req.body);
        const resultado = await repo.save(servicio);
        res.json(resultado);
    } catch (error) {
        console.error("Error al actualizar servicio:", error);
        res.status(400).json({ error: "Error al actualizar servicio" });
    }
}