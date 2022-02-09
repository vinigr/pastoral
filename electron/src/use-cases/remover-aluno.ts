import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";

export async function removerAluno(idAluno) {
  const alunoRepo = getRepository(Aluno);
  const matriculaRepo = getRepository(Matricula);

  await alunoRepo.update(idAluno, { ativo: false });
  await matriculaRepo.update({ aluno: { id: idAluno } }, { ativo: false });

  const aluno = await alunoRepo.findOne(idAluno);

  return aluno;
}
