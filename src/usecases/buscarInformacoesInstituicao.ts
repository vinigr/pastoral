import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarInformacoesInstituicao() {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarInformacoesInstituicao");
  } else {
    return {
      id: 1,
      nome: "Pastoral",
      cnpj: "00000000000001",
      endereco: "Rua teste, Vitória da Conquista - BA",
      email: "teste@teste.com.br",
      telefone: "77-34219032",
    };
  }
}
