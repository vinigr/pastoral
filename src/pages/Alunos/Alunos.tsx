import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Text, useToast } from "@chakra-ui/react";

import { create, trash } from "ionicons/icons";

import buscarAlunosMatriculados from "../../usecases/buscarAlunosMatriculados";
import { formatarCpf } from "../../utils/formatarStrings";
import { useNavigate } from "react-router-dom";
import removerAluno from "../../usecases/removerAluno";

const Alunos: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = async () => {
    const alunosMatriculados = await buscarAlunosMatriculados();

    setAlunos(alunosMatriculados);
  };

  const remover = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja remover essa oficina?"
    );

    if (!confirmacao) {
      return;
    }

    try {
      await removerAluno(id);

      toast({
        title: "Aluno removido com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });

      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    } catch (error) {
      return toast({
        title: "Falha ao remover aluno! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Alunos
      </Text>
      <div className="container">
        <IonList>
          {alunos.map((aluno) => (
            <IonItem key={aluno.id}>
              <IonLabel className="ion-text-wrap">
                <IonText color="dark" style={{ fontWeight: "bold" }}>
                  <h2>{aluno.nome}</h2>
                </IonText>
                <IonText color="medium">
                  <p>CPF: {formatarCpf(aluno.cpf)}</p>
                </IonText>
                <IonText color="medium">
                  <p>Responsável: {aluno.nomeResponsavel}</p>
                </IonText>
              </IonLabel>
              <IonButton
                slot="end"
                onClick={() => navigate(`/aluno/${aluno?.id}`)}
              >
                <IonIcon icon={create} slot="start" />
                Editar
              </IonButton>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => remover(aluno.id)}
              >
                <IonIcon icon={trash} slot="start" />
                Excluir
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </div>
    </>
  );
};

export default Alunos;
