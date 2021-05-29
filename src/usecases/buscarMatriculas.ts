import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarMatriculas() {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarMatriculas");
  } else {
    return [
      {
        id: 1,
        nome: "José Antônio",
        escola: "COEDUC",
        serie: "4",
      },
    ];
  }
}
