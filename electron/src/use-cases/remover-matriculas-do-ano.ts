import { getRepository } from "typeorm";
import { Matricula } from "../entity/Matricula";

export async function removerMatriculasDoAno(ano) {
  const repo = getRepository(Matricula);

  await repo.update({ ano }, { ativo: false });

  const matriculas = await repo.find({ where: { ativo: true } });

  return matriculas;
}
