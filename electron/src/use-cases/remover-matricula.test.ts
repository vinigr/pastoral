import { getRepository } from "typeorm";
import { Matricula } from "../entity/Matricula";
import { criaMatricula } from "../factories/criaMatricula";
import { removerMatricula } from "./remover-matricula";

describe("remover matricula", () => {
  test("remove a matricula", async () => {
    const repo = getRepository(Matricula);

    const matricula = criaMatricula();

    await repo.save(matricula);

    const response = await removerMatricula(matricula.id);

    const matriculaAtualizada = await repo.findOne(matricula.id);

    expect(response.ativo).toBeFalsy();
    expect(matriculaAtualizada.ativo).toBeFalsy();
  });
});
