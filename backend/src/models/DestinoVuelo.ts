import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Ubicacion } from "./Ubicacion"

@Entity()
export class DestinoVuelo {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Ubicacion, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "origen_id" })
    origen!: Ubicacion

    @ManyToOne(() => Ubicacion, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "destino_id" })
    destino!: Ubicacion
}
