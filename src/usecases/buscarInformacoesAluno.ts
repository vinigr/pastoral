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
      dataNascimento: "2000-01-07",
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
      responsavel_tipo: "mae",
      nome_responsavel: "",
      cpfResponsavel: "00000000000",
      enderecoResponsavel: "",
      telefoneResponsavel: "",
      ocupacaoProfissionalResponsavel: "",
      bolsaSocial: "",
      nis: "",
      rgResponsavel: "",
      renda_familiar: 1100,
      religiao: "",
    };
  }
}
