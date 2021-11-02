import { getRepository } from 'typeorm'
import { Usuario } from '../entity/Usuario'
import { fazerLogin } from './fazer-login'

test('retorna falso se não encontra o usuário', async () => {
  const logged = await fazerLogin('', '')

  expect(logged).toBeFalsy()
})

test('retorna verdadeiro se encontra o usuário', async () => {
  const usuario: Usuario = {
    id: 1,
    username: 'teste',
    senha: '123'
  }

  const userRepo = getRepository(Usuario)

  await userRepo.save(usuario)

  const logged = await fazerLogin('teste', '123')

  expect(logged).toBeTruthy()
})