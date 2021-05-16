import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarAlunosMatriculados() {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarAlunosMatriculados");
  } else {
    return [
      {
        id: 1,
        nome: "José Carlos",
        cpf: "00000000001",
        nomeResponsavel: "Manoela",
      },
    ];
  }
}
