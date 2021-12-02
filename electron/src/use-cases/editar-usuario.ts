import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";

export async function editarUsuario(usuario, senha) {
  const userRepo = getRepository(Usuario);

  const user = await userRepo.findOne();

  user.username = usuario;
  user.senha = senha;

  const updatedUser = await userRepo.save(user);

  return updatedUser;
}
