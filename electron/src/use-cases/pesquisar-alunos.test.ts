import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { pesquisarAlunos } from "./pesquisar-alunos";

test("retorna array vazio se não existirem alunos", async () => {
  const alunos = await pesquisarAlunos();

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno sem matricula", async () => {
  const repo = getRepository(Aluno);

  const aluno: Aluno = criaAluno();

  await repo.save(aluno);

  const alunos = await pesquisarAlunos();

  expect(alunos[0].id).toEqual(aluno.id);
});

test("retorna array vazio se encontra alunos mas com matricula do ano", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula: Matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await pesquisarAlunos();

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno com matricula de outro ano", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula: Matricula = criaMatricula(aluno);
  matricula.ativo = false;

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await pesquisarAlunos();

  expect(alunos[0].id).toEqual(aluno.id);
});

test("retorna array vazio se não encontra aluno com o termo", async () => {
  const alunosRepo = getRepository(Aluno);

  const aluno: Aluno = criaAluno();

  await alunosRepo.save(aluno);

  const alunos = await pesquisarAlunos("termo errado");

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno com o termo correto", async () => {
  const alunosRepo = getRepository(Aluno);

  const aluno: Aluno = criaAluno();

  await alunosRepo.save(aluno);

  const alunos = await pesquisarAlunos(aluno.nome);

  expect(alunos?.length).toBeTruthy();
});
