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
        dataNascimento: "07/01/2000",
        rg: "14.671.277-8",
        dataExpedicao: "22/01/2006",
        endereco: "Avenida Lauro de Freitas",
        naturalidade: "Vitória da Conquista",
        nacionalidade: "Brasileira",
        termoCN: "151829",
        folhaCN: "226",
        livroCN: "6378545-21",
        email: "teste@teste.com",
        telefone: "00000000000",
        temParente: true,
        nomeParente: "Antônio Carlos",
        nomeContatoUrgencia: "Matheus Henrique",
        telefoneContatoUrgencia: "777777777777",
      },
      responsavel: {
        parentesco: "mae",
        nome: "Maria do Carmo",
        cpf: "00000000000",
        endereco: "Avenida Lauro de Freitas",
        telefone: "777777777777",
        ocupacaoProfissional: "Dona de casa",
        bolsaSocial: true,
        nis: "976.86368.87-0",
        rg: "46.058.520-4",
        rendaFamiliar: "2000",
        religiao: "Católica",
      },
      matricula: {
        ano: "2021",
        data: "10/05/2021",
        turno: "vespertino",
        escola: "COEDUC",
        serie: 4,
      },
    };
  }
}
