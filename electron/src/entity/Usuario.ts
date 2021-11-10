import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number

  @Column()
  username: string

  @Column()
  senha: string
}