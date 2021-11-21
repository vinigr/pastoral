import { getRepository } from "typeorm";
import { Instituicao } from "../entity/Instituicao";

export async function salvarInformacoesInstituicao(instituicao: Object) {
  const repo = getRepository(Instituicao)

  const instituicaoExistente = await repo.findOne()

  const entidadeInstituicao = repo.create(instituicao)

  if(instituicaoExistente) {
    entidadeInstituicao.id = instituicaoExistente.id
  }

  const instituicaoCriada = await repo.save(entidadeInstituicao);

  return instituicaoCriada
}