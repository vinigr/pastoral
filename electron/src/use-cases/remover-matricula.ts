import { getRepository } from "typeorm";
import { Matricula } from "../entity/Matricula";

export async function removerMatricula(idMatricula) {
  const repo = getRepository(Matricula);

  await repo.update(idMatricula, { ativo: false });

  const matricula = await repo.findOne(idMatricula);

  return matricula;
}
