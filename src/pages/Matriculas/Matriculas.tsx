import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { create, trash } from "ionicons/icons";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
  FormLabel,
} from "@chakra-ui/react";

import ComprovanteMatricula from "../../components/ComprovanteMatricula/ComprovanteMatricula";
import buscarMatriculas from "../../usecases/buscarMatriculas";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import removerMatricula from "../../usecases/removerMatricula";
import removerMatriculasDoAno from "../../usecases/removerMatriculasDoAno";
import AlunosMatriculados from "../../components/AlunosMatriculados/AlunosMatriculados";
import buscarAlunosRelatorio from "../../usecases/buscarAlunosRelatorio";

const Matriculas: React.FC = () => {
  const toast = useToast();

  const [sexo, setSexo] = useState("");
  const [turno, setTurno] = useState("");
  const [alunos, setAlunos] = useState([]);

  const {
    isOpen: isOpenModalFiltrosRelatorio,
    onOpen: onOpenModalFiltrosRelatorio,
    onClose: onCloseModalFiltrosRelatorio,
  } = useDisclosure();

  const componentRef = useRef(null);
  const componentAlunosRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Comprovante de matrícula",
  });

  const handlePrintAlunos = useReactToPrint({
    content: () => componentAlunosRef.current,
    documentTitle: "Alunos",
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

  const remover = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja remover essa matrícula?"
    );

    if (!confirmacao) {
      return;
    }

    try {
      await removerMatricula(id);

      toast({
        title: "Matrícula removida com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });

      setMatriculas(matriculas.filter((matricula) => matricula.id !== id));
    } catch (error) {
      return toast({
        title: "Falha ao remover matrícula! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const inativarMatriculas = async () => {
    const ano = window.prompt(
      "Informe o ano das matrículas que deseja inativar"
    );

    if (!ano) {
      return;
    }

    if (isNaN(parseInt(ano))) {
      return toast({
        title: "Falha",
        description: "Por favor, informe um ano somente com números",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }

    if (parseInt(ano) < 2010 || parseInt(ano) > 2030) {
      return;
    }

    try {
      await removerMatriculasDoAno(ano);

      toast({
        title: "Matrículas inativadas com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });

      listarMatriculas();
    } catch (error) {
      return toast({
        title: "Falha ao inativar matrículas! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const gerarRelatorio = async () => {
    const alunosRelatorio = await buscarAlunosRelatorio(sexo, turno);

    setAlunos(alunosRelatorio);

    handlePrintAlunos();
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
          Matrículas
        </Text>
        <Stack direction="row">
          <Button onClick={onOpenModalFiltrosRelatorio} colorScheme="blue">
            Gerar relatório
          </Button>
          <Button onClick={inativarMatriculas} colorScheme={"orange"}>
            Inativar matrículas
          </Button>
          <Button onClick={() => navigate("/matricula")}>Adicionar</Button>
        </Stack>
      </Flex>
      <div className="container">
        <IonList>
          {matriculas.map((matricula) => (
            <IonItem key={matricula.id}>
              <IonLabel className="ion-text-wrap">
                <IonText color="dark" style={{ fontWeight: "bold" }}>
                  <h2>{matricula.aluno.nome}</h2>
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
              <IonButton
                slot="end"
                color="danger"
                onClick={() => remover(matricula.id)}
              >
                <IonIcon icon={trash} slot="start" />
                Excluir
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </div>

      <div style={{ display: "none" }}>
        <ComprovanteMatricula ref={componentRef} id={idMatriculaImprimir} />
        <AlunosMatriculados ref={componentAlunosRef} alunos={alunos} />
      </div>

      <Modal
        isOpen={isOpenModalFiltrosRelatorio}
        onClose={onCloseModalFiltrosRelatorio}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Relatório</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex direction="column">
                <FormLabel>Sexo</FormLabel>
                <Select
                  placeholder="Todos"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Select>
              </Flex>
              <Flex direction="column">
                <FormLabel>Turno na pastoral</FormLabel>
                <Select
                  placeholder="Todos"
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                >
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                </Select>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onCloseModalFiltrosRelatorio}
            >
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={gerarRelatorio}>
              Gerar relatório
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Matriculas;
