import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Instituicao {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number

  @Column()
  nome: string

  @Column()
  cnpj: string

  @Column()
  endereco: string

  @Column()
  email: string

  @Column()
  telefone: string
}
