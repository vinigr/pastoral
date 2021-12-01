import { getRepository } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { Oficina } from "../entity/Oficina";
import { criaAluno } from "../factories/criaAluno";
import { criaOficina } from "../factories/criaOficina";
import { adicionarAlunoAOficina } from "./adicionar-aluno-a-oficina";

describe("adicionar aluno a oficina", () => {
  test("adiciona aluno", async () => {
    const aluno = criaAluno();
    const oficina = criaOficina();

    const alunoRepo = getRepository(Aluno);
    const oficinaRepo = getRepository(Oficina);

    const alunoCriado = await alunoRepo.save(aluno);
    const oficinaCriada = await oficinaRepo.save(oficina);

    const resposta = await adicionarAlunoAOficina(
      alunoCriado.id,
      oficinaCriada.id
    );

    const oficinaAtualizada = await oficinaRepo.findOne(oficinaCriada.id, {
      relations: ["alunos"],
    });

    expect(resposta.id).toBe(oficinaCriada.id);
    expect(oficinaAtualizada.id).toBe(oficinaCriada.id);
    expect(oficinaAtualizada.alunos.length).toBe(1);
    expect(oficinaAtualizada.alunos[0].id).toBe(alunoCriado.id);
  });
  test("adiciona aluno e mantem os já existentes", async () => {
    const aluno = criaAluno();
    const aluno2 = criaAluno(aluno.id + 1);

    const oficina = criaOficina();

    const alunoRepo = getRepository(Aluno);
    const oficinaRepo = getRepository(Oficina);

    const alunoCriado = await alunoRepo.save(aluno);
    const outroAluno = await alunoRepo.save(aluno2);

    const oficinaCriada = await oficinaRepo.save(oficina);

    oficinaCriada.alunos = [outroAluno];

    await oficinaRepo.save(oficinaCriada);

    const resposta = await adicionarAlunoAOficina(
      alunoCriado.id,
      oficinaCriada.id
    );

    const oficinaAtualizada = await oficinaRepo.findOne(oficinaCriada.id, {
      relations: ["alunos"],
    });

    expect(resposta.id).toBe(oficinaCriada.id);
    expect(oficinaAtualizada.id).toBe(oficinaCriada.id);
    expect(oficinaAtualizada.alunos.length).toBe(2);
    expect(oficinaAtualizada.alunos[1].id).toBe(outroAluno.id);
    expect(oficinaAtualizada.alunos[0].id).toBe(alunoCriado.id);
  });
});
