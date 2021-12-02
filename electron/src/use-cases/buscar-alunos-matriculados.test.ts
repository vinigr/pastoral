import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { buscarAlunosMatriculados } from "./buscar-alunos-matriculados";

test("retorna array vazio se não existirem alunos", async () => {
  const alunos = await buscarAlunosMatriculados();

  expect(alunos).toEqual([]);
});

test("retorna array vazio se não encontra alunos com matricula do ano", async () => {
  const repo = getRepository(Aluno);

  const aluno: Aluno = criaAluno();

  await repo.save(aluno);

  const alunos = await buscarAlunosMatriculados();

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra alunos com matricula do ano", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosMatriculados();

  expect(alunos?.length).toBeTruthy();
});

test("retorna array vazio se encontra aluno sem matricula do ano", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);
  matricula.ativo = false;

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosMatriculados();

  expect(alunos).toEqual([]);
});

test("retorna array vazio se encontra aluno sem o termo correto", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosMatriculados("termo errado");

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno com o termo correto", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosMatriculados(aluno.nome);

  expect(alunos?.length).toBeTruthy();
});
