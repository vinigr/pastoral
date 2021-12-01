import { editarOficina } from "./editar-oficina";
import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";
import { criaOficina } from "../factories/criaOficina";

describe("editar oficina", () => {
  test("retorna oficina com dados atualizados", async () => {
    const entidadeOficina = criaOficina();

    const repo = getRepository(Oficina);

    const oficinaCriada = await repo.save(entidadeOficina);

    const edicao = {
      nome: "novo nome",
    };

    const oficinaEditada = await editarOficina(oficinaCriada.id, edicao);

    const oficinas = await repo.find();

    expect(oficinaEditada.id).toBe(oficinaCriada.id);
    expect(oficinaEditada.nome).not.toBe(oficinaCriada.nome);
    expect(oficinaEditada.nome).toBe(edicao.nome);
    expect(oficinas.length).toBe(1);
    expect(oficinas[0].nome).toBe(edicao.nome);
  });
});
