import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"

export async function buscarAluno(id) {
  const repo = getRepository(Aluno)

  const aluno = await repo.findOne(id)

  return aluno
}