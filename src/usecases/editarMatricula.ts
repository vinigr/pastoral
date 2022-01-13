import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

interface Matricula {
  escola: string;
  turno: string;
  serie: string;
  turno_pastoral: string;
  matricula_escola: string;
}

export default async function editarMatricula(id, matricula: Matricula) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarMatricula", id, matricula);
  }

  return true;
}
