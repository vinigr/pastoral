import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { buscarMatriculaComAluno } from "./buscar-matricula-com-aluno";

describe("busca matrícula com aluno", () => {
  test("retorna matricula com aluno ao receber o id", async () => {
    const alunosRepo = getRepository(Aluno);
    const matriculasRepo = getRepository(Matricula);

    const aluno: Aluno = criaAluno();

    const matricula: Matricula = criaMatricula(aluno);

    await alunosRepo.save(aluno);

    await matriculasRepo.save(matricula);

    const matriculaRecebida = await buscarMatriculaComAluno(matricula.id);

    expect(matriculaRecebida.id).toBe(matricula.id);
    expect(matriculaRecebida?.aluno?.id).toBe(aluno.id);
  });
});
