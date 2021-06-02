import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarAlunosMatriculados(itemPesquisa = null) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarAlunosMatriculados",itemPesquisa);
  } else {

    const alunosMatriculados = [
      {
        id: 1,
        nome: "José Carlos",
        cpf: "00000000001",
        nomeResponsavel: "Manoela",
      },
      {
        id: 2,
        nome: "Xico",
        cpf: "00000000002",
        nomeResponsavel: "João",
      }
    ];

    if(!itemPesquisa){
      return alunosMatriculados 
    } 
    
    const regex = new RegExp(`${itemPesquisa.trim()}`, "i");

    return alunosMatriculados.filter((aluno) => regex.test(aluno.nome) === true);
  }
}
