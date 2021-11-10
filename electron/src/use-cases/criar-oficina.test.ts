import { criarOficina } from "./criar-oficina";

import { getRepository } from "typeorm"
import { Oficina } from "../entity/Oficina"

describe('criar oficina', () => {
  test('retorna oficina criada com id', async () => {
    const oficina = {
      nome: "",
      professor: "",
      nivel: "",
      horario: new Date(),
      alunos: []
    }

    const resposta = await criarOficina(oficina);

    const repo = getRepository(Oficina);

    const oficinas = await repo.find()

    expect(resposta.id).toBeTruthy()
    expect(oficinas.length).toBe(1)
  })
})