export function criaAluno(id = 1) {
  return {
    id,
    nome: "teste",
    sexo: "",
    cpf: "",
    data_nascimento: new Date(),
    rg: "",
    data_expedicao_rg: new Date(),
    endereco: "",
    naturalidade: "",
    nacionalidade: "",
    certidao_nova: true,
    certidao_codigo: "",
    certidao_nascimento_termo: "",
    certidao_nascimento_folha: "",
    certidao_nascimento_livro: "",
    email: "",
    telefone: "",
    tem_parente: false,
    nome_parente: "",
    contato_nome: "",
    contato_telefone: "",
    responsavel_tipo: "",
    responsavel_cpf: "",
    responsavel_rg: "",
    responsavel_nome: "",
    afinidades: "",
    responsavel_nis: "",
    cras: "",
    responsavel_endereco: "",
    responsavel_telefone: "",
    responsavel_recebe_auxilio: false,
    responsavel_profissao: "",
    renda_familiar: 0,
    permite_catequese: false,
    matriculas: [],
    ativo: true,
  };
}