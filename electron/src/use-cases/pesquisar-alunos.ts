import { getRepository, Like } from "typeorm"
import { Aluno } from "../entity/Aluno"


export async function pesquisarAlunos(term?: string) {
  const alunoRepo = getRepository(Aluno)

  const whereClause = term? { nome: Like(`%${term}%`) } : {}

  const alunos = await alunoRepo.find({
    relations: ['matriculas'],
    where: whereClause,
    take: 10
  })

  return alunos.filter(aluno => !aluno.matriculas.some(matricula => matricula.ano == new Date().getFullYear()))
}

