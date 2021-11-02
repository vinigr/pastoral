import { getRepository, Like } from "typeorm"
import { Aluno } from "../entity/Aluno"


export async function buscarAlunosMatriculados(term?: string) {
  const alunoRepo = getRepository(Aluno)

  const whereClause = term ? {
    matriculas: {
      ano: new Date().getFullYear()
    }
  } : [{ nome: Like(`%${term}%`) }, {
    matriculas: {
      ano: new Date().getFullYear()
    }
  }]

  const whereClause2 = qb => {
    qb.where('matricula.ano = :ano', {
      ano: new Date().getFullYear()
    })
  }

  const alunos = await alunoRepo.find({
    join: {
      alias: "aluno",
      leftJoin: {
        matricula: "matricula"
      }
    },
    where: whereClause2
  })

  return alunos
}

