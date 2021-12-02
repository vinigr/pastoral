import { getRepository } from "typeorm";
import { Matricula } from "../entity/Matricula";
import { criaMatricula } from "../factories/criaMatricula";
import { removerMatriculasDoAno } from "./remover-matriculas-do-ano";

describe("remover matriculas do ano", () => {
  test("remove a matricula", async () => {
    const repo = getRepository(Matricula);

    const matricula = criaMatricula();

    matricula.ano = 2020;

    await repo.save(matricula);

    const response = await removerMatriculasDoAno(matricula.ano);

    const matriculaAtualizada = await repo.findOne(matricula.id);

    expect(response.length).toBe(0);
    expect(matriculaAtualizada.ativo).toBeFalsy();
  });
  test("remove apenas a matricula do ano", async () => {
    const repo = getRepository(Matricula);

    const matricula = criaMatricula();

    matricula.ano = 2020;

    const matricula2 = criaMatricula();

    matricula2.ano = 2021;
    matricula2.id = undefined;

    await repo.save([matricula, matricula2]);

    const response = await removerMatriculasDoAno(matricula.ano);

    const matriculaAtualizada = await repo.findOne(matricula.id);
    const matricula2Atualizada = await repo.findOne(matricula2.id);

    expect(response.length).toBe(1);
    expect(matriculaAtualizada.ativo).toBeFalsy();
    expect(matricula2Atualizada.ativo).toBeTruthy();
  });
});
