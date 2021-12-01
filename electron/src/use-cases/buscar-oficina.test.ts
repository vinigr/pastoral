import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Oficina } from "../entity/Oficina";
import { criaAluno } from "../factories/criaAluno";
import { criaOficina } from "../factories/criaOficina";
import { buscarOficina } from "./buscar-oficina";

describe("buscar oficina", () => {
  test("retorna oficina", async () => {
    const oficina = criaOficina();

    const repo = getRepository(Oficina);

    await repo.save(oficina);

    const response = await buscarOficina(oficina.id);

    expect(response.id).toBe(oficina.id);
  });

  test("retorna oficina com aluno se existir", async () => {
    const alunosRepo = getRepository(Aluno);
    const oficinaRepo = getRepository(Oficina);

    const oficina = criaOficina();
    const aluno: Aluno = criaAluno();

    await alunosRepo.save(aluno);

    oficina.alunos = [aluno];

    await oficinaRepo.save(oficina);

    const response = await buscarOficina(oficina.id);

    expect(response.id).toBe(oficina.id);
    expect(response.alunos.length).toBe(1);
    expect(response.alunos[0].id).toBe(aluno.id);
  });
});
