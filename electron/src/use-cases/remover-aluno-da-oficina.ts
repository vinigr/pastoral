import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";

export async function removerAlunoDaOficina(idAluno, idOficina) {
  const oficinaRepo = getRepository(Oficina);

  const oficina = await oficinaRepo.findOne(idOficina, {
    relations: ["alunos"],
  });

  oficina.alunos = oficina.alunos.filter((aluno) => aluno.id != idAluno);

  const oficinaAtualizada = await oficinaRepo.save(oficina);

  return oficinaAtualizada;
}
