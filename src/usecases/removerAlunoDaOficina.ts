import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerAlunoDaOficina(idAluno, idOficina) {
  if (isElectron()) {
    return await chamarFuncaoElectron(
      "removerAlunoDaOficina",
      idAluno,
      idOficina
    );
  }
  return true;
}
