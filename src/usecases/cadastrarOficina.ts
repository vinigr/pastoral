import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function cadastrarOficina({
  nome,
  professor,
  horario,
  nivel,
}) {
  if (isElectron()) {
    return await chamarFuncaoElectron("cadastrarOficina", {
      nome,
      professor,
      horario,
      nivel,
    });
  } else {
    return true;
  }
}
