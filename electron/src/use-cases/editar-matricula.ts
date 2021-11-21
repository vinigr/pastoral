import { getRepository } from "typeorm"
import { Matricula } from "../entity/Matricula";

export async function editarMatricula(id, matricula: Object) {
  const repo = getRepository(Matricula);

  await repo.update(id, matricula);

  const matriculaEditada = await repo.findOne(id)

  return matriculaEditada
}