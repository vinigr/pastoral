import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import adicionarAlunoAOficina from "../../usecases/adicionarAlunoAOficina";
import buscarAlunosMatriculados from "../../usecases/buscarAlunosMatriculados";
import buscarOficina from "../../usecases/buscarOficina";
import removerAlunoDaOficina from "../../usecases/removerAlunoDaOficina";

const AlunosOficina: React.FC = () => {
  const toast = useToast();
  let { id: idOficina } = useParams() ?? {};

  const [alunosSelecionados, setAlunosSelecionados] = useState([]);

  const [pesquisa, setPesquisa] = useState("");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    buscarInformacoesIniciais();
  }, []);

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

  const buscarInformacoesIniciais = async () => {
    const oficina = await buscarOficina(idOficina);

    if (oficina) {
      setAlunosSelecionados(oficina.alunos);
    }
  };

  const adicionarAluno = (aluno) => {
    const alunoJaEstaNaOficina = alunosSelecionados.find(
      (a) => a.id === aluno.id
    );

    if (alunoJaEstaNaOficina) {
      return toast({
        title: "O aluno já está matriculado na oficina!",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }

    try {
      const resultado = adicionarAlunoAOficina(aluno.id, idOficina);

      if (resultado) {
        toast({
          title: "Aluno adicionado com sucesso!",
          status: "success",
          position: "top-right",
          duration: 2000,
        });

        const alunosMatriculados = Array.from(alunosSelecionados);
        alunosMatriculados.push({ id: aluno.id, nome: aluno.nome });
        return setAlunosSelecionados(alunosMatriculados);
      }

      return toast({
        title:
          "Falha ao adicionar aluno da oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      return toast({
        title:
          "Falha ao adicionar aluno da oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const removerAluno = (id) => {
    try {
      const resultado = removerAlunoDaOficina(id, idOficina);

      if (resultado) {
        toast({
          title: "Aluno removido com sucesso!",
          status: "success",
          position: "top-right",
          duration: 2000,
        });

        const alunos = alunosSelecionados.filter((a) => id !== a.id);

        return setAlunosSelecionados(alunos);
      }

      return toast({
        title: "Falha ao remover aluno da oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      return toast({
        title: "Falha ao remover aluno da oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Alunos - Oficina
      </Text>
      <Stack spacing={6} mt={6}>
        <Input
          placeholder="Pesquisar aluno matriculado"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <Stack mt={10}>
          <Text fontWeight="bold">Alunos encontrados na pesquisa</Text>

          <Stack>
            {alunos.map((aluno) => (
              <Box
                key={aluno.id}
                d="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>{aluno?.nome}</Text>
                <IconButton
                  colorScheme="blue"
                  aria-label="Adicionar aluno"
                  icon={<AddIcon />}
                  onClick={() => {
                    setPesquisa("");
                    adicionarAluno(aluno);
                    setAlunos([]);
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack>
          <Text fontWeight="bold">Alunos matriculados na oficina</Text>
          <Stack>
            {alunosSelecionados?.map((aluno) => (
              <Box
                key={aluno.id}
                d="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>{aluno?.nome}</Text>
                <IconButton
                  size="sm"
                  colorScheme="red"
                  aria-label="Remover aluno"
                  icon={<CloseIcon />}
                  onClick={() => removerAluno(aluno.id)}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AlunosOficina;
