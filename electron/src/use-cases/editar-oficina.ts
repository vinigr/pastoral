import { getRepository } from "typeorm"
import { Oficina } from "../entity/Oficina"

export async function editarOficina(id, oficina: Object) {
  const repo = getRepository(Oficina);

  await repo.update(id, oficina);

  const oficinaEditada = await repo.findOne(id)

  return oficinaEditada
}