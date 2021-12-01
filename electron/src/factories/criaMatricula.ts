export function criaMatricula(aluno?) {
  return {
    id: 1,
    data: new Date(),
    turno: "",
    ano: new Date().getFullYear(),
    escola: "",
    serie: "4 ano",
    ativo: true,
    aluno,
  };
}
