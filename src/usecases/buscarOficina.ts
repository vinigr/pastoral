import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarOficina(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarOficina", id);
  } else {
    return {
      id: 1,
      nome: "Karatê",
      professor: "Sérgio",
      horario: "09:00",
      nivel: "Faixa branca",
      alunos: [],
    };
  }
}
