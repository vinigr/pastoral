import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Aluno } from './Aluno'

@Entity()
export class Matricula {
  @PrimaryColumn()
  id: number

  @Column()
  ano: number

  @Column("date")
  data: Date

  @Column()
  turno: string

  @Column()
  escola: string

  @Column()
  serie: string

  @ManyToOne(() => Aluno, aluno => aluno.matriculas)
  aluno: Aluno
}