import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { Matricula } from "../entity/Matricula"
import { listarMatriculas } from "./listar-matriculas"

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


describe('listar matricula', () => {
  test('retorna array vazio se não tem matriculas', async () => {
    const resposta = await listarMatriculas()

    expect(resposta).toEqual([])
  })

  test('retorna array com matricula se tem matriculas no ano', async () => {
    const alunosRepo = getRepository(Aluno)
    const matriculasRepo = getRepository(Matricula)

    const aluno: Aluno = criaAluno()

    const matricula: Matricula = criaMatricula(aluno)

    await alunosRepo.save(aluno)
    await matriculasRepo.save(matricula)

    const resposta = await listarMatriculas()

    expect(resposta.length).toBe(1)
    expect(resposta[0].id).toBe(matricula.id)
    expect(resposta[0].aluno.id).toBe(aluno.id)
  })

  test('retorna array vazio se tem matriculas, mas não são do ano', async () => {
    const alunosRepo = getRepository(Aluno)
    const matriculasRepo = getRepository(Matricula)

    const aluno: Aluno = criaAluno()

    const matricula: Matricula = criaMatricula(aluno)

    matricula.ano = 2000

    await alunosRepo.save(aluno)
    await matriculasRepo.save(matricula)

    const resposta = await listarMatriculas()

    expect(resposta.length).toBe(0)
  })
})