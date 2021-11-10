import { getRepository } from "typeorm"
import { Oficina } from "../entity/Oficina"

export async function criarOficina(oficina: Object) {
  const repo = getRepository(Oficina);

  const entidadeOficina = repo.create(oficina)

  const oficinaCriada = await repo.save(entidadeOficina);

  return oficinaCriada
}