import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { criaAluno } from "../factories/criaAluno";
import { removerAluno } from "./remover-aluno";

describe("remover aluno", () => {
  test("remove o aluno", async () => {
    const repo = getRepository(Aluno);

    const aluno = criaAluno();

    await repo.save(aluno);

    const response = await removerAluno(aluno.id);

    const alunoAtualizado = await repo.findOne(aluno.id);

    expect(response.ativo).toBeFalsy();
    expect(alunoAtualizado.ativo).toBeFalsy();
  });
});
