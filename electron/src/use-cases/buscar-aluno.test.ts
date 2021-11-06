import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { buscarAluno } from "./buscar-aluno"

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


describe('buscar aluno', () => {
  test('retorna aluno ao buscar com o id', async () => {
    const aluno = criaAluno()

    const repo = getRepository(Aluno)

    await repo.save(aluno)

    const resposta = await buscarAluno(aluno.id)

    expect(resposta.id).toEqual(aluno.id)
  })
})