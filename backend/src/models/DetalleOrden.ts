import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Orden } from "./Orden"
import { Producto } from "./Producto"

@Entity()
export class DetalleOrden {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Orden, (orden) => orden.detalles, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orden_id" })
    orden!: Orden

    @ManyToOne(() => Producto, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "producto_id" })
    producto?: Producto | null

    @Column({ type: "int" })
    cantidad!: number

    @Column({ type: "numeric", precision: 10, scale: 2 })
    precio!: number
}
