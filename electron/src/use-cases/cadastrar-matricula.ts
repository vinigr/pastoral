import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";

export async function cadastrarMatricula({
  idAluno,
  aluno,
  matricula
}: {
  idAluno: any,
  aluno: Object,
  matricula: Object
}) {
  const matriculaRepo = getRepository(Matricula);

  const alunoExistente = idAluno ? await buscaAluno(idAluno) : await criaAluno(aluno)

  const entidadeMatricula = matriculaRepo.create(matricula);

  entidadeMatricula.aluno = alunoExistente

  const matriculaCriada = await matriculaRepo.save(entidadeMatricula)

  return matriculaCriada
}

async function buscaAluno(idAluno) {
  const alunoRepo = getRepository(Aluno);

  const aluno = await alunoRepo.findOne(idAluno)

  return aluno
}

async function criaAluno(aluno: Object) {
  const alunoRepo = getRepository(Aluno);

  const entidade = alunoRepo.create(aluno)

  const alunoCriado = await alunoRepo.save(entidade)

  return alunoCriado
}