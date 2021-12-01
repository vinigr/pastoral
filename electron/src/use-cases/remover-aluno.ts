import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";

export async function removerAluno(idAluno) {
  const repo = getRepository(Aluno);

  await repo.update(idAluno, { ativo: false });

  const aluno = await repo.findOne(idAluno);

  return aluno;
}
