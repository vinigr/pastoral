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

import buscarMatriculas from "../../usecases/buscarMatriculas";
import { useHistory } from "react-router-dom";

const Matriculas: React.FC = () => {
  const { push } = useHistory();

  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    listarMatriculas();
  }, []);

  const listarMatriculas = async () => {
    const alunosMatriculados = await buscarMatriculas();

    setMatriculas(alunosMatriculados);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Matrículas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle size="large">Matrículas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonList>
            {matriculas.map((matricula) => (
              <IonItem key={matricula.id}>
                <IonLabel className="ion-text-wrap">
                  <IonText color="dark" style={{ fontWeight: "bold" }}>
                    <h2>{matricula.nome}</h2>
                  </IonText>
                  <IonText color="medium">
                    <p>Escola: {matricula.escola}</p>
                  </IonText>
                  <IonText color="medium">
                    <p>Série: {matricula.serie}</p>
                  </IonText>
                </IonLabel>
                <IonButton
                  slot="end"
                  onClick={() => push(`matricula/${matricula?.id}`)}
                >
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

export default Matriculas;
