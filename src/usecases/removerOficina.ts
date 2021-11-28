import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function removerOficina(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("removerOficina", id);
  }
  return true;
}
