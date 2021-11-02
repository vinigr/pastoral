import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Usuario {
  @PrimaryColumn()
  id: number

  @Column()
  username: string

  @Column()
  senha: string
}