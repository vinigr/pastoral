import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";

export async function listarOficinas() {
  const repo = getRepository(Oficina);

  const oficinas = await repo.find({ ativo: true });

  return oficinas;
}
