import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerAluno(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("removerAluno", id);
  }
  return true;
}
