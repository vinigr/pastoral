import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { criaAluno } from "../factories/criaAluno";
import { editarAluno } from "./editar-aluno";

describe("editar aluno", () => {
  test("edita o aluno e retorna o valor editado", async () => {
    const repo = getRepository(Aluno);

    const aluno = criaAluno();

    const entidadeAluno = repo.create(aluno);

    await repo.save(entidadeAluno);

    const edicao = {
      nome: "editado",
    };

    const resposta = await editarAluno(aluno.id, edicao);

    const alunos = await repo.find();

    expect(resposta.id).toBe(aluno.id);
    expect(alunos.length).toBe(1);
    expect(alunos[0].nome).toBe(edicao.nome);
  });
});
