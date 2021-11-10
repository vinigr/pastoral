import { getRepository } from "typeorm"
import { Oficina } from "../entity/Oficina"

export async function buscarOficina(id) {
  const repo = getRepository(Oficina)

  const oficina = await repo.findOne(id, { relations: ['alunos'] })

  return oficina
}