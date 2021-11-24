import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

interface Dados {
  idAluno?: number;
  aluno?: any;
  matricula: any;
}

export default async function cadastrarMatriculaEAluno({
  idAluno,
  aluno,
  matricula,
}: Dados) {
  if (isElectron()) {
    return await chamarFuncaoElectron("cadastrarMatriculaEAluno", {
      idAluno,
      aluno,
      matricula,
    });
  }
  return true;
}
