import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm"
import { Ubicacion } from "./Ubicacion"

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar", length: 100 })
  nombre!: string

  @Column({ type: "varchar", length: 150, unique: true })
  email!: string

  @Column({ type: "varchar", length: 255 })
  contraseña!: string

  @Column({ type: "varchar", length: 50 })
  rol!: string

  @ManyToOne(() => Ubicacion, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "ubicacion_id" })
  ubicacion?: Ubicacion | null
}
