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
