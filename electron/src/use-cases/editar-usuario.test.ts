import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { editarUsuario } from "./editar-usuario";

test("edita e retorna usuário editado", async () => {
  const usuario: Usuario = {
    id: 1,
    username: "teste",
    senha: "123",
  };

  const userRepo = getRepository(Usuario);

  await userRepo.save(usuario);

  const response = await editarUsuario(
    "usuario-atualizado",
    "senha-atualizada"
  );

  const updatedUser = await userRepo.findOne();

  expect(updatedUser.username).toBe("usuario-atualizado");
  expect(updatedUser.senha).toBe("senha-atualizada");
  expect(response.username).toBe("usuario-atualizado");
  expect(response.senha).toBe("senha-atualizada");
});
