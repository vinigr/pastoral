import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { criaAluno } from "../factories/criaAluno";
import { buscarAluno } from "./buscar-aluno";

describe("buscar aluno", () => {
  test("retorna aluno ao buscar com o id", async () => {
    const aluno = criaAluno();

    const repo = getRepository(Aluno);

    await repo.save(aluno);

    const resposta = await buscarAluno(aluno.id);

    expect(resposta.id).toEqual(aluno.id);
  });
});
