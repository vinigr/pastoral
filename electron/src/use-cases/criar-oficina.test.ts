import { criarOficina } from "./criar-oficina";

import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";
import { criaOficina } from "../factories/criaOficina";

describe("criar oficina", () => {
  test("retorna oficina criada com id", async () => {
    const oficina = criaOficina()

    const resposta = await criarOficina(oficina);

    const repo = getRepository(Oficina);

    const oficinas = await repo.find();

    expect(resposta.id).toBeTruthy();
    expect(oficinas.length).toBe(1);
  });
});
