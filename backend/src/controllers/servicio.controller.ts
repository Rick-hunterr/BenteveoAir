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
