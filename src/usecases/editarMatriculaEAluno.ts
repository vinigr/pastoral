import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

interface Dados {
  aluno?: any;
  responsavel?: any;
  matricula: any;
}

export default async function editarMatriculaEAluno(
  id,
  { aluno, responsavel, matricula }: Dados
) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarMatriculaEAluno", id, {
      aluno,
      responsavel,
      matricula,
    });
  } else {
    return true;
  }
}
