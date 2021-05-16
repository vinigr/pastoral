import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function salvarInformacoesInstituicao({
  nome,
  cnpj,
  endereco,
  email,
  telefone,
}) {
  if (isElectron()) {
    return await chamarFuncaoElectron("salvarInformacoesInstituicao", {
      nome,
      cnpj,
      endereco,
      email,
      telefone,
    });
  } else {
    return true;
  }
}
