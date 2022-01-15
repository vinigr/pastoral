export function criaMatricula(aluno?) {
  return {
    id: 1,
    data: new Date(),
    turno: "",
    turno_pastoral: "",
    ano: new Date().getFullYear(),
    escola: "",
    matricula_escola: "teste",
    serie: "4 ano",
    ativo: true,
    aluno,
  };
}
