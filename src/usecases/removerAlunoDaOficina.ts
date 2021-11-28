import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerAlunoDaOficina(idAluno) {
  if (isElectron()) {
    return await chamarFuncaoElectron("removerAlunoDaOficina", idAluno);
  }
  return true;
}
