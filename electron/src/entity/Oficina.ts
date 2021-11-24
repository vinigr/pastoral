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

  @ManyToMany(() => Aluno)
  @JoinTable()
  alunos: Aluno[];

}