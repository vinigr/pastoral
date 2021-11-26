import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { Matricula } from "../entity/Matricula"
import { pesquisarAlunos } from "./pesquisar-alunos"

const criaAluno = (): Aluno => ({
  id: 1,
  nome: "teste",
  sexo: "",
  cpf: "",
  data_nascimento: new Date(),
  rg: "",
  data_expedicao_rg: new Date(),
  endereco: "",
  naturalidade: "",
  nacionalidade: "",
  certidao_nascimento_termo: "",
  certidao_nascimento_folha: "",
  certidao_nascimento_livro: "",
  email: "",
  telefone: "",
  tem_parente: false,
  nome_parente: "",
  contato_nome: "",
  contato_telefone: "",
  responsavel_tipo: "",
  responsavel_cpf: "",
  responsavel_rg: "",
  responsavel_nome: "",
  responsavel_nis: "",
  responsavel_endereco: "",
  responsavel_telefone: "",
  responsavel_recebe_auxilio: false,
  responsavel_profissao: "",
  renda_familiar: 0,
  permite_catequese: false,
  matriculas: []
})

const criaMatricula = (aluno): Matricula => ({
  id: 1,
  data: new Date(),
  turno: "",
  ano: new Date().getFullYear(),
  escola: "",
  serie: "4 ano",
  aluno
})

test('retorna array vazio se não existirem alunos', async () => {
  const alunos = await pesquisarAlunos()

  expect(alunos).toEqual([])
})

test('retorna array com aluno se encontra aluno sem matricula', async () => {
  const repo = getRepository(Aluno)

  const aluno: Aluno = criaAluno()

  await repo.save(aluno)

  const alunos = await pesquisarAlunos()

  expect(alunos[0].id).toEqual(aluno.id)
})

test('retorna array vazio se encontra alunos mas com matricula do ano', async () => {
  const alunosRepo = getRepository(Aluno)
  const matriculasRepo = getRepository(Matricula)

  const aluno: Aluno = criaAluno()

  const matricula: Matricula = criaMatricula(aluno)

  await alunosRepo.save(aluno)

  await matriculasRepo.save(matricula)

  const alunos = await pesquisarAlunos()

  expect(alunos).toEqual([])
})

test('retorna array com aluno se encontra aluno com matricula de outro ano', async () => {
  const alunosRepo = getRepository(Aluno)
  const matriculasRepo = getRepository(Matricula)

  const aluno: Aluno = criaAluno()

  const matricula: Matricula = criaMatricula(aluno)
  matricula.ano = 2000

  await alunosRepo.save(aluno)

  await matriculasRepo.save(matricula)

  const alunos = await pesquisarAlunos()

  expect(alunos[0].id).toEqual(aluno.id)
})

test('retorna array vazio se não encontra aluno com o termo', async () => {
  const alunosRepo = getRepository(Aluno)

  const aluno: Aluno = criaAluno()

  await alunosRepo.save(aluno)

  const alunos = await pesquisarAlunos("termo errado")

  expect(alunos).toEqual([])
})

test('retorna array com aluno se encontra aluno com o termo correto', async () => {
  const alunosRepo = getRepository(Aluno)

  const aluno: Aluno = criaAluno()

  await alunosRepo.save(aluno)

  const alunos = await pesquisarAlunos(aluno.nome)

  expect(alunos?.length).toBeTruthy()
})