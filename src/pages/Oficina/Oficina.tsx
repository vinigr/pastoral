import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import buscarAlunosMatriculados from "../../usecases/buscarAlunosMatriculados";
import buscarOficina from "../../usecases/buscarOficina";
import cadastrarOficina from "../../usecases/cadastrarOficina";
import editarOficina from "../../usecases/editarOficina";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "@chakra-ui/react";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  professor: Yup.string().required("O professor é obrigatório"),
  horario: Yup.string().required("O horário é obrigatório"),
  nivel: Yup.string().required("O nível da oficina é obrigatório"),
});

const Oficina: React.FC = () => {
  const [present] = useIonToast();
  const navigate = useNavigate();
  let { id } = useParams() ?? {};

  // const [novoAluno, setNovoAluno] = useState<boolean>(false)
  // const [alunoSelecionado, setAlunoSelecionado] = useState<{ id: number; nome: string }>();
  const [alunoSelecionado, setAlunoSelecionado] = useState([]);

  const [pesquisa, setPesquisa] = useState("");
  const [alunos, setAlunos] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      buscarInformacoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (pesquisa) {
      alunosMatriculados(pesquisa);
    } else {
      setAlunos([]);
    }
  }, [pesquisa]);

  const alunosMatriculados = async (itemPesquisa) => {
    const alunosMatriculadosFiltro = await buscarAlunosMatriculados(
      itemPesquisa
    );

    setAlunos(alunosMatriculadosFiltro);
  };

  function adicionarAlunos(aluno) {
    const alunosMatriculados = Array.from(alunoSelecionado);
    alunosMatriculados.push({ id: aluno.id, nome: aluno.nome });
    setAlunoSelecionado(alunosMatriculados);
    console.log(aluno);
  }

  const buscarInformacoes = async () => {
    const oficina = await buscarOficina(id);

    if (oficina) {
      setValue("nome", oficina?.nome);
      setValue("professor", oficina.professor);
      setValue("horario", oficina.horario);
      setValue("nivel", oficina?.nivel);
    }
  };

  const onSubmit = async ({
    nome,
    professor,
    horario,
    nivel,
  }: {
    nome: string;
    professor: string;
    horario: string;
    nivel: string;
  }) => {
    const dados = {
      nome,
      professor,
      horario,
      nivel,
    };

    if (id) {
      const resultado = await editarOficina(id, dados);

      if (resultado) {
        present({
          message: "Oficina salva com sucesso!",
          color: "success",
          duration: 2000,
        });

        return navigate("/oficinas");
      }
      return present({
        message: "Falha ao salvar oficina! Por favor, tente novamente",
        color: "danger",
        duration: 2000,
      });
    } else {
      const resultado = await cadastrarOficina(dados);

      if (resultado) {
        present({
          message: "Oficina cadastrada com sucesso!",
          color: "success",
          duration: 2000,
        });

        return navigate("/oficinas");
      }

      return present({
        message: "Falha ao cadastrar oficina! Por favor, tente novamente",
        color: "danger",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Oficina
      </Text>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "nome",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  placeholder="Nome"
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="nome"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.nome?.message}</div>

          <IonItem>
            <IonLabel position="floating">Professor</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "professor",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="professor"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.professor?.message}</div>

          <IonItem>
            <IonLabel position="floating">Horário</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "horario",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  placeholder=""
                  type="time"
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="horario"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.horario?.message}</div>

          <IonItem>
            <IonLabel position="floating">Nível</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "nivel",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="nivel"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.nivel?.message}</div>

          <IonSearchbar
            placeholder="Pesquisar aluno Matriculado"
            onIonChange={(e) => setPesquisa(e.detail.value!)}
          />

          {alunoSelecionado && (
            <>
              <IonLabel>Alunos:</IonLabel>
              {alunoSelecionado.map((aluno) => (
                <IonItem>
                  <IonLabel>{aluno?.nome}</IonLabel>
                  <IonButton
                    slot="end"
                    color="danger"
                    onClick={() => {
                      const alunos = alunoSelecionado.filter(
                        (a) => aluno.id !== a.id
                      );
                      setAlunoSelecionado(alunos);
                    }}
                  >
                    X
                  </IonButton>
                </IonItem>
              ))}
            </>
          )}
          <>
            <IonList>
              {alunos.map((aluno) => (
                <IonItem
                  button
                  key={aluno.id}
                  onClick={() => {
                    setPesquisa("");
                    adicionarAlunos(aluno);
                    setAlunos([]);
                  }}
                >
                  {aluno.nome}
                </IonItem>
              ))}
            </IonList>
          </>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IonButton type="submit">Salvar</IonButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Oficina;
