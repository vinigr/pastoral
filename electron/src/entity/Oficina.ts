import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'
import { Aluno } from './Aluno'

@Entity()
export class Oficina {

  @PrimaryColumn()
  id: number

  @Column()
  nome: string

  @Column()
  professor: string

  @Column()
  nivel: string

  @Column("datetime")
  horario: Date

  @ManyToMany(() => Aluno)
  @JoinTable()
  categories: Aluno[];

}