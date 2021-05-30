import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarInformacoesAluno(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarInformacoesAluno", id);
  } else {
    return {
      id: "",
      nome: "Teste",
      sexo: "masculino",
      cpf: "000000000000",
      dataNascimento: "07/01/2000",
      rg: "",
      dataExpedicao: "",
      endereco: "",
      naturalidade: "Vitória da Conquista",
      nacionalidade: "Brasileira",
      termoCN: "",
      folhaCN: "",
      livroCN: "",
      email: "",
      telefone: "00000000000",
      temParente: true,
      nomeParente: "",
      nomeContatoUrgencia: "",
      telefoneContatoUrgencia: "777777777777",
      parentesco: "mae",
      nomeResponsavel: "",
      cpfResponsavel: "00000000000",
      enderecoResponsavel: "",
      telefoneResponsavel: "",
      ocupacaoProfissionalResponsavel: "",
      bolsaSocial: "",
      nis: "",
      rgResponsavel: "",
      rendaFamiliar: "",
      religiao: "",
    };
  }
}
