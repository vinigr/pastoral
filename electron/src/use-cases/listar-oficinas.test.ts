import { getRepository } from "typeorm"
import { Aluno } from "../entity/Aluno"
import { Oficina } from "../entity/Oficina"
import { buscarOficina } from "./buscar-oficina"
import { listarOficinas } from "./listar-oficinas"

describe('listar oficinas', () => {
  test('retorna array vazio se não tem oficinas', async () => {
    const response = await listarOficinas();

    expect(response.length).toBe(0)
  })

  test('retorna oficinas', async () => {
    const oficina = criaOficina()

    const repo = getRepository(Oficina)

    await repo.save(oficina)

    const response = await listarOficinas();

    expect(response.length).toBe(1)
  })
})

const criaOficina = (): Oficina => ({
  id: 0,
  nome: "",
  professor: "",
  nivel: "",
  horario: new Date(),
  alunos: []
})