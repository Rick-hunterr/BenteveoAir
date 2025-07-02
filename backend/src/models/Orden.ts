import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn
} from "typeorm"
import { Usuario } from "./Usuario"
import { DetalleOrden } from "./DetalleOrden"

@Entity()
export class Orden {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Usuario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario

    @CreateDateColumn({ type: "timestamp" })
    fecha!: Date

    @Column({ type: "varchar", length: 50 })
    estado!: string

    @OneToMany(() => DetalleOrden, (detalle) => detalle.orden)
    detalles!: DetalleOrden[]
}
