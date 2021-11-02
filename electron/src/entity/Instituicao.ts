import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Instituicao {
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
