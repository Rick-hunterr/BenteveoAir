import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Producto } from "./Producto"

@Entity()
export class Calificaciones {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "real", nullable: true })
    calificaciones!: number

    @ManyToOne(() => Producto, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "producto_id" })
    producto?: Producto | null
}