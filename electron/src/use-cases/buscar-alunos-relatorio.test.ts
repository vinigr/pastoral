import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { buscarAlunosRelatorio } from "./buscar-alunos-relatorio";

test("retorna array vazio se não existirem alunos", async () => {
  const alunos = await buscarAlunosRelatorio("", "");

  expect(alunos).toEqual([]);
});

test("retorna array vazio se não encontra alunos com matricula do ano", async () => {
  const repo = getRepository(Aluno);

  const aluno: Aluno = criaAluno();

  await repo.save(aluno);

  const alunos = await buscarAlunosRelatorio("", "");

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra alunos com matricula do ano", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio("", "");

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

  const alunos = await buscarAlunosRelatorio("", "");

  expect(alunos).toEqual([]);
});

test("retorna array vazio se encontra aluno sem o sexo filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();
  aluno.sexo = "F"

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio("M", "");

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno com o sexo filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();
  aluno.sexo = "M"

  const matricula = criaMatricula(aluno);

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio(aluno.sexo, "");

  expect(alunos?.length).toBeTruthy();
});

test("retorna array vazio se encontra aluno sem o turno filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);
  matricula.turno_pastoral = "Vespertino"

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio("", "Matutino");

  expect(alunos).toEqual([]);
});

test("retorna array com aluno se encontra aluno com o turno filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();

  const matricula = criaMatricula(aluno);
  matricula.turno_pastoral = "Vespertino"

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio("", matricula.turno_pastoral);

  expect(alunos?.length).toBeTruthy();
});

test("retorna array com aluno se encontra aluno com o turno e sexo filtrados", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();
  aluno.sexo = "M"

  const matricula = criaMatricula(aluno);
  matricula.turno_pastoral = "Vespertino"

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio(aluno.sexo, matricula.turno_pastoral);

  expect(alunos?.length).toBeTruthy();
});

test("retorna array vazio se encontra aluno com o turno, mas sem sexo filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();
  aluno.sexo = "M"

  const matricula = criaMatricula(aluno);
  matricula.turno_pastoral = "Vespertino"

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio("errado", matricula.turno_pastoral);

  expect(alunos).toEqual([]);
});

test("retorna array vazio se encontra aluno com o sexo, mas sem o turno filtrado", async () => {
  const alunosRepo = getRepository(Aluno);
  const matriculasRepo = getRepository(Matricula);

  const aluno: Aluno = criaAluno();
  aluno.sexo = "M"

  const matricula = criaMatricula(aluno);
  matricula.turno_pastoral = "Vespertino"

  await alunosRepo.save(aluno);

  await matriculasRepo.save(matricula);

  const alunos = await buscarAlunosRelatorio(aluno.sexo, "turno errado");

  expect(alunos).toEqual([]);
});