import { getRepository, Like } from "typeorm";
import { Aluno } from "../entity/Aluno";

export async function pesquisarAlunos(term?: string) {
  const alunoRepo = getRepository(Aluno);

  const whereClause = term
    ? { ativo: true, nome: Like(`%${term}%`) }
    : { ativo: true };

  const alunos = await alunoRepo.find({
    relations: ["matriculas"],
    where: whereClause,
    take: 10,
  });

  return alunos.filter(
    (aluno) => !aluno.matriculas.some((matricula) => matricula.ativo)
  );
}
