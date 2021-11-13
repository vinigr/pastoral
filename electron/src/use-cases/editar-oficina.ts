import { getRepository } from "typeorm"
import { Oficina } from "../entity/Oficina"

export async function editarOficina(oficina: Object) {
  const repo = getRepository(Oficina);

  const entidadeOficina = repo.create(oficina)

  const oficinaEditada = await repo.save(entidadeOficina);

  return oficinaEditada
}