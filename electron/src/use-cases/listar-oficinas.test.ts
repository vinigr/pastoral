import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";
import { criaOficina } from "../factories/criaOficina";
import { listarOficinas } from "./listar-oficinas";

describe("listar oficinas", () => {
  test("retorna array vazio se não tem oficinas", async () => {
    const response = await listarOficinas();

    expect(response.length).toBe(0);
  });

  test("retorna oficinas", async () => {
    const oficina = criaOficina();

    const repo = getRepository(Oficina);

    await repo.save(oficina);

    const response = await listarOficinas();

    expect(response.length).toBe(1);
  });

  test("retorna array vazio se só tem oficinas inativas", async () => {
    const oficina = criaOficina();
    oficina.ativo = false;

    const repo = getRepository(Oficina);

    await repo.save(oficina);

    const response = await listarOficinas();

    expect(response.length).toBe(0);
  });
});
