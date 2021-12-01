import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";
import { criaOficina } from "../factories/criaOficina";
import { removerOficina } from "./remover-oficina";

describe("remover oficina", () => {
  test("remove o oficina", async () => {
    const repo = getRepository(Oficina);

    const oficina = criaOficina();

    await repo.save(oficina);

    const response = await removerOficina(oficina.id);

    const oficinaAtualizado = await repo.findOne(oficina.id);

    expect(response.ativo).toBeFalsy();
    expect(oficinaAtualizado.ativo).toBeFalsy();
  });
});
