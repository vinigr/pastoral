import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { add, create, trash } from "ionicons/icons";
import { Text } from "@chakra-ui/react";

import ComprovanteMatricula from "../../components/ComprovanteMatricula/ComprovanteMatricula";
import buscarMatriculas from "../../usecases/buscarMatriculas";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Matriculas: React.FC = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Comprovante de matrícula",
  });

  const navigate = useNavigate();

  const [matriculas, setMatriculas] = useState([]);

  const [idMatriculaImprimir, setIdMatriculaImprimir] = useState();

  useEffect(() => {
    listarMatriculas();
  }, []);

  const listarMatriculas = async () => {
    const alunosMatriculados = await buscarMatriculas();

    setMatriculas(alunosMatriculados);
  };

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Matrículas
      </Text>
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
                onClick={() => {
                  setIdMatriculaImprimir(matricula.id);
                  handlePrint();
                }}
              >
                <IonIcon icon={create} slot="start" />
                Imprimir comprovante
              </IonButton>
              <IonButton
                slot="end"
                onClick={() => navigate(`/matricula/${matricula?.id}`)}
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
        <IonFabButton onClick={() => navigate("/matricula")}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <div style={{ display: "none" }}>
        <ComprovanteMatricula ref={componentRef} id={idMatriculaImprimir} />
      </div>
    </>
  );
};

export default Matriculas;
