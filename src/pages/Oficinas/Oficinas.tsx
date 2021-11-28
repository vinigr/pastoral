import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { create, trash, person } from "ionicons/icons";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";

import buscarOficinas from "../../usecases/buscarOficinas";
import { useNavigate } from "react-router-dom";
import removerOficina from "../../usecases/removerOficina";

const Oficinas: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    const oficinasCadastradas = await buscarOficinas();

    setOficinas(oficinasCadastradas);
  };

  const remover = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja remover essa oficina?"
    );

    if (!confirmacao) {
      return;
    }

    try {
      await removerOficina(id);

      toast({
        title: "Oficina removida com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });

      setOficinas(oficinas.filter((oficina) => oficina.id !== id));
    } catch (error) {
      return toast({
        title: "Falha ao remover oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
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
                onClick={() => navigate(`/oficina/${oficina?.id}/alunos`)}
              >
                <IonIcon icon={person} slot="start" />
                Alunos
              </IonButton>
              <IonButton
                slot="end"
                onClick={() => navigate(`/oficina/${oficina?.id}`)}
              >
                <IonIcon icon={create} slot="start" />
                Editar
              </IonButton>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => remover(oficina.id)}
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

export default Oficinas;
