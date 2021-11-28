import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function adicionarAlunoAOficina(idAluno) {
  if (isElectron()) {
    return await chamarFuncaoElectron("adicionarAlunoAOficina", idAluno);
  }
  return true;
}
