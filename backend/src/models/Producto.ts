import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Servicio } from "./Servicio"
import { DestinoVuelo } from "./DestinoVuelo"

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 100 })
    nombre!: string

    @Column({ type: "text", nullable: true })
    descripcion?: string

    @Column({ type: "text", nullable: true })
    duracion!: string

    @Column({ type: "date", nullable: true })
    fecha?: Date

    @Column({ type: "text", nullable: true })
    imagen?: string

    @Column({ type: "text", nullable: true})
    hotel!: string

    @Column({ type: "real", nullable: true })
    descuento?: number

    @Column({ type: "real", nullable: true })
    calificacion?: number

    @Column({ type: "numeric", precision: 10, scale: 2 })
    precio!: number

    @ManyToOne(() => Servicio, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "servicio_id" })
    servicio?: Servicio | null

    @ManyToOne(() => DestinoVuelo, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "destino_vuelo_id" })
    destinoVuelo?: DestinoVuelo | null
}
