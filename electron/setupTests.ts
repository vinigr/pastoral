import { createConnection, getConnection } from "typeorm"

import { Aluno } from "./src/entity/Aluno"
import { Instituicao } from "./src/entity/Instituicao"
import { Matricula } from "./src/entity/Matricula"
import { Oficina } from "./src/entity/Oficina"
import { Usuario } from "./src/entity/Usuario"

global.beforeAll(async () => {
  await createConnection(
    {
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [
        Usuario,
        Aluno,
        Instituicao,
        Oficina,
        Matricula
      ],
      synchronize: true,
      logging: false
    }
  )
})

global.afterEach(async () => {
  const conn = getConnection()

  await conn.synchronize(true)
})
