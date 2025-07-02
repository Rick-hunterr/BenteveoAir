import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm"
import { Producto } from "./Producto"

@Entity()
export class Servicio {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 100, unique: true })
    nombre!: string

    @Column({ type: "text", nullable: true })
    descripcion?: string

    @OneToMany(() => Producto, producto => producto.servicio)
    productos?: Producto[]
}
