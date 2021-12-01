import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Matricula } from "../entity/Matricula";
import { criaAluno } from "../factories/criaAluno";
import { criaMatricula } from "../factories/criaMatricula";
import { cadastrarMatricula } from "./cadastrar-matricula";

describe("cadastrar matricula", () => {
  test("cadastra matricula com aluno criado se receber o id do aluno", async () => {
    const matricula = criaMatricula();

    const aluno = criaAluno();

    const objetoEntrada = {
      idAluno: aluno.id,
      aluno: undefined,
      matricula,
    };

    const matriculaRepositorio = getRepository(Matricula);
    const alunoRepositorio = getRepository(Aluno);

    const entidadeAluno = alunoRepositorio.create(aluno);

    await alunoRepositorio.save(entidadeAluno);

    const resposta = await cadastrarMatricula(objetoEntrada);

    const matriculaCadastrada = await matriculaRepositorio.findOne(
      matricula.id,
      {
        relations: ["aluno"],
      }
    );

    expect(resposta.id).toBe(matricula.id);
    expect(matriculaCadastrada.id).toBe(matricula.id);
    expect(matriculaCadastrada.aluno.id).toBe(aluno.id);
  });
  test("cadastra matricula e aluno se não receber o id do aluno", async () => {
    const matricula = criaMatricula();

    const aluno = criaAluno();

    const objetoEntrada = {
      idAluno: undefined,
      aluno: aluno,
      matricula,
    };

    const matriculaRepositorio = getRepository(Matricula);

    const resposta = await cadastrarMatricula(objetoEntrada);

    const matriculaCadastrada = await matriculaRepositorio.findOne(
      matricula.id,
      {
        relations: ["aluno"],
      }
    );

    expect(resposta.id).toBe(matricula.id);
    expect(matriculaCadastrada.id).toBe(matricula.id);
    expect(matriculaCadastrada.aluno.id).toBe(aluno.id);
  });
});
