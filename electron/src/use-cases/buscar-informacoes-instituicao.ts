import { getRepository } from "typeorm"
import { Instituicao } from "../entity/Instituicao"

export async function buscarInformacoesInstituicao() {
  const repo = getRepository(Instituicao)

  const instituicao = repo.findOne()

  return instituicao
}