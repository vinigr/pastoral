import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno";
import { editarAluno } from "./editar-aluno";

const criaAluno = () => ({
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
})

describe('editar aluno', () => {
  test('edita o aluno e retorna o valor editado', async () => {
    const repo = getRepository(Aluno);

    const aluno = criaAluno()

    const entidadeAluno = repo.create(aluno)

    await repo.save(entidadeAluno)

    const edicao = {
      nome: "editado",
    }

    const resposta = await editarAluno(aluno.id, edicao);

    const alunos = await repo.find()

    expect(resposta.id).toBe(aluno.id)
    expect(alunos.length).toBe(1)
    expect(alunos[0].nome).toBe(edicao.nome)
  })
})
