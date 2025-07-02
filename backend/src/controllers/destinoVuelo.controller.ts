import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { DestinoVuelo } from "../models/DestinoVuelo";
import { Ubicacion } from "../models/Ubicacion";

const repo = AppDataSource.getRepository(DestinoVuelo);
const repoUbicacion = AppDataSource.getRepository(Ubicacion);

export async function obtenerDestinosVuelo(req: Request, res: Response) {
    try {
        const destinos = await repo.find({ relations: ["origen", "destino"] });
        res.json(destinos);
    } catch (error) {
        console.error("Error al obtener destinos de vuelo:", error);
        res.status(500).json({ error: "Error al obtener destinos de vuelo" });
    }
}

export async function crearDestinoVuelo(req: Request, res: Response) {
    try {
        const { origenId, destinoId, ...data } = req.body;

        const origen = await repoUbicacion.findOneBy({ id: origenId });
        const destino = await repoUbicacion.findOneBy({ id: destinoId });

        const destinoVuelo = repo.create({
            ...data,
            origen,
            destino,
        });

        const resultado = await repo.save(destinoVuelo);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error al crear destino de vuelo:", error);
        res.status(400).json({ error: "Error al crear destino de vuelo" });
    }
}

export async function eliminarDestinoVuelo(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("ID inválido");
        return;
    }

    try {
        const destino = await repo.findOneBy({ id: Number(id) });
        if (!destino) {
            res.status(404).send("Destino de vuelo no encontrado");
            return;
        }

        await repo.remove(destino);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar destino de vuelo:", error);
        res.status(500).json({ error: "Error al eliminar destino de vuelo" });
    }
}
