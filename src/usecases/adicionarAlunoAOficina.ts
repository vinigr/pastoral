import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function adicionarAlunoAOficina(idAluno, idOficina) {
  if (isElectron()) {
    return await chamarFuncaoElectron(
      "adicionarAlunoAOficina",
      idAluno,
      idOficina
    );
  }
  return true;
}
