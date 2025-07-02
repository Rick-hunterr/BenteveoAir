import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Ubicacion {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar", length: 100 })
  ciudad!: string

  @Column({ type: "varchar", length: 100 })
  pais!: string
}
