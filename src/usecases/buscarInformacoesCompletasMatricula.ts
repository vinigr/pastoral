import { chamarFuncaoElectron } from "../utils/chamarFuncaoElectron";
import { isElectron } from "../utils/isElectron";

export default async function buscarInformacoesCompletas(id) {
  if (isElectron()) {
    return await chamarFuncaoElectron("buscarInformacoesCompletas", id);
  } else {
    return {
      aluno: {
        id: "",
        nome: "Teste",
        sexo: "masculino",
        cpf: "000000000000",
        data_nascimento: "2000-07-01",
        rg: "14.671.277-8",
        data_expedicao: "22/01/2006",
        endereco: "Avenida Lauro de Freitas",
        naturalidade: "Vitória da Conquista",
        nacionalidade: "Brasileira",
        certidao_nova: true,
        certidao_codigo: "111",
        certidao_nascimento_termo: "151829",
        certidao_nascimento_folha: "226",
        certidao_nascimento_livro: "6378545-21",
        email: "teste@teste.com",
        telefone: "00000000000",
        temParente: true,
        nomeParente: "Antônio Carlos",
        nomeContatoUrgencia: "Matheus Henrique",
        telefoneContatoUrgencia: "777777777777",
        responsavel_tipo: "mae",
        responsavel_nome: "Maria do Carmo",
        responsavel_cpf: "00000000000",
        responsavel_endereco: "Avenida Lauro de Freitas",
        responsavel_telefone: "777777777777",
        responsavel_profissao: "Dona de casa",
        bolsaSocial: true,
        responsavel_nis: "976.86368.87-0",
        responsavel_rg: "46.058.520-4",
        renda_familiar: "2000",
        permite_catequese: true,
      },
      data: "2020-05-10",
      ano: "2021",
      turno: "vespertino",
      escola: "COEDUC",
      serie: 4,
    };
  }
}
