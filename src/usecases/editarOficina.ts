import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function editarOficina(
  id,
  { nome, professor, horario, nivel }
) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarOficina", id, {
      nome,
      professor,
      horario,
      nivel,
    });
  } else {
    return true;
  }
}
