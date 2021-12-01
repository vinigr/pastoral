import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { listarMatriculas } from "./listar-matriculas";

describe("listar matricula", () => {
  test("retorna array vazio se não tem matriculas", async () => {
    const resposta = await listarMatriculas();

    expect(resposta).toEqual([]);
  });

  test("retorna array com matricula se tem matriculas no ano", async () => {
    const alunosRepo = getRepository(Aluno);
    const matriculasRepo = getRepository(Matricula);

    const aluno: Aluno = criaAluno();

    const matricula: Matricula = criaMatricula(aluno);

    await alunosRepo.save(aluno);
    await matriculasRepo.save(matricula);

    const resposta = await listarMatriculas();

    expect(resposta.length).toBe(1);
    expect(resposta[0].id).toBe(matricula.id);
    expect(resposta[0].aluno.id).toBe(aluno.id);
  });

  test("retorna array vazio se tem matriculas, mas não são do ano", async () => {
    const alunosRepo = getRepository(Aluno);
    const matriculasRepo = getRepository(Matricula);

    const aluno: Aluno = criaAluno();

    const matricula: Matricula = criaMatricula(aluno);

    matricula.ano = 2000;

    await alunosRepo.save(aluno);
    await matriculasRepo.save(matricula);

    const resposta = await listarMatriculas();

    expect(resposta.length).toBe(0);
  });
});
