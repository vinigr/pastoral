import { getRepository } from "typeorm";
import { Instituicao } from "../entity/Instituicao";
import { salvarInformacoesInstituicao } from "./salvar-informacoes-instituicao";

describe('Salvar informações da instituição', () => {
  test('cria instituição se não existir', async () => {
    const repo = getRepository(Instituicao)

    const instituicao: Instituicao = {
      id: 0,
      nome: "",
      cnpj: "",
      endereco: "",
      email: "",
      telefone: ""
    }
    
    await salvarInformacoesInstituicao(instituicao);

    const instituicoes = await repo.find();

    expect(instituicoes.length).toBe(1)
  })

  test('atualiza instituição se já existir', async () => {
    const repo = getRepository(Instituicao)

    const instituicao: Instituicao = {
      id: 0,
      nome: "",
      cnpj: "",
      endereco: "",
      email: "",
      telefone: ""
    }

    await repo.save(instituicao)
    
    const instituicaoAtualizada = {
      ...instituicao,
      id: 1
    }

    await salvarInformacoesInstituicao(instituicaoAtualizada);

    const instituicoes = await repo.find();

    expect(instituicoes.length).toBe(1)
    expect(instituicoes[0].id).toBe(instituicao.id)
  })
})