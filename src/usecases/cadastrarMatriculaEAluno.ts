import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

interface Dados {
  idAluno?: number;
  aluno?: any;
  responsavel?: any;
  matricula: any;
}

export default async function cadastrarMatriculaEAluno({
  idAluno,
  aluno,
  responsavel,
}: Dados) {
  if (isElectron()) {
    return await chamarFuncaoElectron("cadastrarMatriculaEAluno", {
      idAluno,
      aluno,
      responsavel,
    });
  } else {
    return true;
  }
}
