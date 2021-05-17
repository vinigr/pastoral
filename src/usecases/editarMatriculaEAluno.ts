import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function editarMatriculaEAluno(
  id,
  {
    nome,
    cpf,
    dataNascimento,
    rg,
    dataExpedicao,
    endereco,
    naturalidade,
    nacionalidade,
    termoCN,
    folhaCN,
    livroCN,
    email,
    telefone,
    temParente,
    nomeParente,
    nomeContatoUrgencia,
    telefoneContatoUrgencia,
    parentesco,
    nomeResponsavel,
    cpfResponsavel,
    enderecoResponsavel,
    telefoneResponsavel,
    ocupacaoProfissionalResponsavel,
    bolsaSocial,
    nis,
    rgResponsavel,
    rendaFamiliar,
    religiao,
  }
) {
  if (isElectron()) {
    return await chamarFuncaoElectron("editarMatriculaEAluno", id, {
      nome,
      cpf,
      dataNascimento,
      rg,
      dataExpedicao,
      endereco,
      naturalidade,
      nacionalidade,
      termoCN,
      folhaCN,
      livroCN,
      email,
      telefone,
      temParente,
      nomeParente,
      nomeContatoUrgencia,
      telefoneContatoUrgencia,
      parentesco,
      nomeResponsavel,
      cpfResponsavel,
      enderecoResponsavel,
      telefoneResponsavel,
      ocupacaoProfissionalResponsavel,
      bolsaSocial,
      nis,
      rgResponsavel,
      rendaFamiliar,
      religiao,
    });
  } else {
    return true;
  }
}
