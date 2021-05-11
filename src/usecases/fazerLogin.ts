import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function fazerLogin(usuario: string, senha: string) {
  if (isElectron()) {
    return await chamarFuncaoElectron("fazerLogin", {
      usuario,
      senha,
    });
  } else {
    return usuario === "vinicios" && senha === "123";
  }
}
