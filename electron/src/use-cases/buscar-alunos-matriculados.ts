import { getRepository, Like } from "typeorm"
import { Aluno } from "../entity/Aluno"


export async function buscarAlunosMatriculados(term?: string) {
  const alunoRepo = getRepository(Aluno)

  const whereClause = qb => {
    qb.where('matricula.ano = :ano', {
      ano: new Date().getFullYear()
    })
    if (term) {
      qb.andWhere('aluno.nome like :termo', { termo: `%${term}%` })
    }
  }

  const alunos = await alunoRepo.find({
    join: {
      alias: "aluno",
      leftJoin: {
        matricula: "matricula"
      }
    },
    where: whereClause
  })

  return alunos
}

