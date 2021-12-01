import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm'
import { Aluno } from './Aluno'

@Entity()
export class Oficina {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number

  @Column()
  nome: string

  @Column()
  professor: string

  @Column()
  nivel: string

  @Column()
  horario: string

  @Column({default: true})
  ativo: boolean

  @ManyToMany(() => Aluno, aluno => aluno.oficinas)
  @JoinTable()
  alunos: Aluno[];

}