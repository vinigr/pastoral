import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function editarAluno(id, { aluno, responsavel }) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarAluno", id, {
      aluno,
      responsavel,
    });
  } else {
    return true;
  }
}
