import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function pesquisarAlunos(termoPesquisa) {
  if (isElectron()) {
    return await chamarFuncaoElectron("pesquisaAlunos", termoPesquisa);
  } else {
    const alunos = [
      {
        id: 1,
        nome: "José Antônio",
      },
      {
        id: 2,
        nome: "Xico",
      }
    ];

    const regex = new RegExp(`${termoPesquisa.trim()}`, "i");

    return alunos.filter((aluno) => regex.test(aluno.nome) === true);
  }
}
