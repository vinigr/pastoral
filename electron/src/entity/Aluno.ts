import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Matricula } from "./Matricula";
import { Oficina } from "./Oficina";

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column("character")
  sexo: string;

  @Column()
  cpf: string;

  @Column("date")
  data_nascimento: Date;

  @Column()
  rg: string;

  @Column("date")
  data_expedicao_rg: Date;

  @Column()
  endereco: string;

  @Column()
  naturalidade: string;

  @Column()
  nacionalidade: string;

  @Column()
  certidao_nascimento_termo: string;

  @Column()
  certidao_nascimento_folha: string;

  @Column()
  certidao_nascimento_livro: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  tem_parente: boolean;

  @Column()
  nome_parente: string;

  @Column()
  contato_nome: string;

  @Column()
  contato_telefone: string;

  @Column()
  responsavel_tipo: string;

  @Column()
  responsavel_cpf: string;

  @Column()
  responsavel_nome: string;

  @Column()
  responsavel_nis: string;

  @Column()
  responsavel_rg: string;

  @Column()
  responsavel_endereco: string;

  @Column()
  responsavel_telefone: string;

  @Column()
  responsavel_recebe_auxilio: boolean;

  @Column()
  responsavel_profissao: string;

  @Column("decimal")
  renda_familiar: number;

  @Column()
  permite_catequese: boolean;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Matricula, (matricula) => matricula.aluno)
  matriculas: Matricula[];
}
