import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";

export async function removerOficina(idOficina) {
  const repo = getRepository(Oficina);

  await repo.update(idOficina, { ativo: false });

  const oficina = await repo.findOne(idOficina);

  return oficina;
}
