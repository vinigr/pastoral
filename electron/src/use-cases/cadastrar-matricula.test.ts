import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { Matricula } from "../entity/Matricula"
import { cadastrarMatricula } from "./cadastrar-matricula"
import { editarMatricula } from "./editar-matricula"

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

const criaMatricula = () => ({
  id: 1,
  data: new Date(),
  turno: "",
  ano: new Date().getFullYear(),
  escola: "",
  serie: "4 ano",
})

describe('cadastrar matricula', () => {
  test('cadastra matricula com aluno criado se receber o id do aluno', async () => {
    const matricula = criaMatricula()

    const aluno = criaAluno()

    const objetoEntrada = {
      idAluno: aluno.id,
      aluno: undefined,
      matricula
    }

    const matriculaRepositorio = getRepository(Matricula)
    const alunoRepositorio = getRepository(Aluno)

    const entidadeAluno = alunoRepositorio.create(aluno)

    await alunoRepositorio.save(entidadeAluno)

    const resposta = await cadastrarMatricula(objetoEntrada)

    const matriculaCadastrada = await matriculaRepositorio.findOne(matricula.id, {
      relations: ['aluno']
    })

    expect(resposta.id).toBe(matricula.id)
    expect(matriculaCadastrada.id).toBe(matricula.id)
    expect(matriculaCadastrada.aluno.id).toBe(aluno.id)
  })
  test('cadastra matricula e aluno se não receber o id do aluno', async () => {
    const matricula = criaMatricula()

    const aluno = criaAluno()

    const objetoEntrada = {
      idAluno: undefined,
      aluno: aluno,
      matricula
    }

    const matriculaRepositorio = getRepository(Matricula)

    const resposta = await cadastrarMatricula(objetoEntrada)

    const matriculaCadastrada = await matriculaRepositorio.findOne(matricula.id, {
      relations: ['aluno']
    })

    expect(resposta.id).toBe(matricula.id)
    expect(matriculaCadastrada.id).toBe(matricula.id)
    expect(matriculaCadastrada.aluno.id).toBe(aluno.id)
  })
})