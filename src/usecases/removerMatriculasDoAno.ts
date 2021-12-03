import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerMatriculasDoAno(ano) {
  if (isElectron()) {
    return await chamarFuncaoElectron("removerMatriculasDoAno", ano);
  }
  return true;
}
