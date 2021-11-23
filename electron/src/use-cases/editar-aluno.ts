import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno";

export async function editarAluno(id, aluno: Object) {
  const repo = getRepository(Aluno);

  await repo.update(id, aluno);

  const alunoEditado = await repo.findOne(id)

  return alunoEditado
}