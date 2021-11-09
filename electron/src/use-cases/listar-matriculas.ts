import { getRepository } from "typeorm"
import { Matricula } from "../entity/Matricula"

export async function listarMatriculas() {
  const repo = getRepository(Matricula)

  const matricula = await repo.find({
    relations: ["aluno"],
    where: {
      ano: new Date().getFullYear()
    }
  })

  return matricula
}