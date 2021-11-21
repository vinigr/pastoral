import { getRepository } from "typeorm"
import { Matricula } from "../entity/Matricula"
import { editarMatricula } from "./editar-matricula"

describe('editar matricula', () => {
  test('edita matricula', async () => {
    const matriculaOriginal = {
      id: 1,
      data: new Date(),
      turno: "",
      ano: new Date().getFullYear(),
      escola: "",
      serie: "4 ano",
    }

    const repo = getRepository(Matricula)

    const entidadeMatricula = repo.create(matriculaOriginal)

    await repo.save(entidadeMatricula)

    const edicao = {
      escola: "novo nome"
    }

    const matriculaEditada = await editarMatricula(matriculaOriginal.id, edicao)

    const matriculas = await repo.find()

    expect(matriculaEditada.id).toBe(matriculaOriginal.id)
    expect(matriculaEditada.escola).toBe(edicao.escola)
    expect(matriculas.length).toBe(1)
    expect(matriculas[0].escola).toBe(edicao.escola)
  })
})