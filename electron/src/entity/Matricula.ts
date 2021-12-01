import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Aluno } from './Aluno'

@Entity()
export class Matricula {
  @PrimaryGeneratedColumn()
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

  @Column({default: true})
  ativo: boolean

  @ManyToOne(() => Aluno, aluno => aluno.matriculas)
  aluno: Aluno
}