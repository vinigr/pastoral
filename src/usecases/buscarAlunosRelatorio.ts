import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarAlunosRelatorio(sexo, turno) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarAlunosRelatorio", sexo, turno);
  }

  return [
    {
      id: 1,
      nome: "José Carlos",
    },
    {
      id: 2,
      nome: "Xico",
    },
  ];
}
