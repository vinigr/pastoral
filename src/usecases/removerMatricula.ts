import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerMatricula(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("removerMatricula", id);
  }
  return true;
}
