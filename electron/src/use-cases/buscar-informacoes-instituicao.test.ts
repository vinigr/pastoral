import { getRepository } from "typeorm"
import { Instituicao } from "../entity/Instituicao"
import { buscarInformacoesInstituicao } from "./buscar-informacoes-instituicao"

describe("busca instituição", () => {
  test("retorna informações da instituição", async () => {
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

    const resposta = await buscarInformacoesInstituicao()

    expect(resposta).toEqual(instituicao)
  })
})
