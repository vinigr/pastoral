import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarInformacoesMatriculaAluno(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarInformacoesMatriculaAluno", id);
  } else {
    return {
      aluno: {
        id: 2,
        nome: "Carlos",
      },
      ano: 2020,
      escola: "COEDUC",
      serie: "4",
      turno: "matutino",
      turno_pastoral: "vespertino",
      matricula_escola: "fdfjkdiosf",
    };
  }
}
