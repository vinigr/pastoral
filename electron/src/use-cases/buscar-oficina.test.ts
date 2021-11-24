import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { Oficina } from "../entity/Oficina"
import { buscarOficina } from "./buscar-oficina"

describe('buscar oficina', () => {
  test('retorna oficina', async () => {
    const oficina = criaOficina()

    const repo = getRepository(Oficina)

    await repo.save(oficina)

    const response = await buscarOficina(oficina.id);

    expect(response.id).toBe(oficina.id)
  })

  test('retorna oficina com aluno se existir', async () => {
    const alunosRepo = getRepository(Aluno)
    const oficinaRepo = getRepository(Oficina)

    const oficina = criaOficina()
    const aluno: Aluno = criaAluno()

    await alunosRepo.save(aluno)

    oficina.alunos = [aluno]

    await oficinaRepo.save(oficina)

    const response = await buscarOficina(oficina.id);

    expect(response.id).toBe(oficina.id)
    expect(response.alunos.length).toBe(1)
    expect(response.alunos[0].id).toBe(aluno.id)
  })
})

const criaOficina = (): Oficina => ({
  id: 0,
  nome: "",
  professor: "",
  nivel: "",
  horario: new Date(),
  alunos: []
})

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