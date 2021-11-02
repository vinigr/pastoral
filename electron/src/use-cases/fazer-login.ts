import { getRepository } from "typeorm"
import { Usuario } from "../entity/Usuario"


export async function fazerLogin(usuario, senha) {
  const userRepo = getRepository(Usuario)

  const user = await userRepo.findOne({ where: { username: usuario, senha } })

  return !!user
}