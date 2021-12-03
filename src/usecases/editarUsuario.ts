import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function editarUsuario(usuario, senha) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarUsuario", usuario, senha);
  }
  return true;
}
