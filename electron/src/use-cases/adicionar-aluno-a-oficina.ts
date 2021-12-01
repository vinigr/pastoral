import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Oficina } from "../entity/Oficina";

export async function adicionarAlunoAOficina(idAluno, idOficina) {
  const alunoRepo = getRepository(Aluno);
  const oficinaRepo = getRepository(Oficina);

  const oficina = await oficinaRepo.findOne(idOficina, {
    relations: ["alunos"],
  });

  const aluno = await alunoRepo.findOne(idAluno);

  oficina.alunos = [...oficina.alunos, aluno];

  const oficinaAtualizada = await oficinaRepo.save(oficina);

  return oficinaAtualizada;
}
