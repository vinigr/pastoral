import { getRepository, Like } from "typeorm";
import { Aluno } from "../entity/Aluno";

export async function buscarAlunosRelatorio(sexo: string, turno: string) {
  const alunoRepo = getRepository(Aluno);

  const whereClause = (qb) => {
    qb.where("matricula.ativo = true");
    if (sexo) {
      qb.andWhere("aluno.sexo = :sexo", { sexo });
    }
    if (turno) {
      qb.andWhere("matricula.turno_pastoral = :turno", { turno });
    }
  };

  const alunos = await alunoRepo.find({
    join: {
      alias: "aluno",
      leftJoin: {
        matricula: "matricula",
      },
    },
    where: whereClause,
  });

  return alunos;
}
