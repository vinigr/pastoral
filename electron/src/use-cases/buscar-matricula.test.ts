import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { buscarMatricula } from "./buscar-matricula";

describe("buscar matricula", () => {
  test("retorna a matricula", async () => {
    const alunosRepo = getRepository(Aluno);
    const matriculasRepo = getRepository(Matricula);

    const aluno: Aluno = criaAluno();

    const matricula = criaMatricula(aluno);

    await alunosRepo.save(aluno);
    await matriculasRepo.save(matricula);

    const resposta = await buscarMatricula(matricula.id);

    expect(resposta.id).toBe(matricula.id);
    expect(resposta.aluno.id).toBe(matricula.aluno.id);
  });
});
