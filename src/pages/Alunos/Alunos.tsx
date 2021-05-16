import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { add, create, trash } from "ionicons/icons";

import buscarAlunosMatriculados from "../../usecases/buscarAlunosMatriculados";
import { formatarCpf } from "../../utils/formatarStrings";
import { useHistory } from "react-router-dom";

const Alunos: React.FC = () => {
  const { push } = useHistory();

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = async () => {
    const alunosMatriculados = await buscarAlunosMatriculados();

    setAlunos(alunosMatriculados);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Alunos matriculados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle size="large">Alunos matriculados</IonTitle>
          </IonToolbar>
        </IonHeader>
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
                <IonButton slot="end">
                  <IonIcon icon={create} slot="start" />
                  Editar
                </IonButton>
                <IonButton slot="end" color="danger">
                  <IonIcon icon={trash} slot="start" />
                  Excluir
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => push("matricula")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default Alunos;
