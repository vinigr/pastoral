import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { create, trash } from "ionicons/icons";
import { Button, Flex, Text } from "@chakra-ui/react";

import buscarOficinas from "../../usecases/buscarOficinas";
import { useNavigate } from "react-router-dom";

const Oficinas: React.FC = () => {
  const navigate = useNavigate();

  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    const oficinasCadastradas = await buscarOficinas();

    setOficinas(oficinasCadastradas);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        onClick={() => navigate("/oficina")}
      >
        <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
          Oficinas
        </Text>
        <Button>Adicionar</Button>
      </Flex>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}></Text>
      <div className="container">
        <IonList>
          {oficinas.map((oficina) => (
            <IonItem key={oficina.id}>
              <IonLabel className="ion-text-wrap">
                <IonText color="dark" style={{ fontWeight: "bold" }}>
                  <h2>{oficina.nome}</h2>
                </IonText>
                <IonText color="medium">
                  <p>Professor: {oficina.professor}</p>
                </IonText>
                <IonText color="medium">
                  <p>Horário: {oficina.horario}</p>
                </IonText>
                <IonText color="medium">
                  <p>Nível: {oficina.nivel}</p>
                </IonText>
              </IonLabel>
              <IonButton
                slot="end"
                onClick={() => navigate(`/oficina/${oficina?.id}`)}
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
    </>
  );
};

export default Oficinas;
