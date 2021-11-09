import { getRepository } from "typeorm"
import { Matricula } from "../entity/Matricula"

export async function buscarMatricula(idMatricula) {
  const repo = getRepository(Matricula)

  const matricula = await repo.findOne(idMatricula, { relations: ["aluno"] })

  return matricula
}