import * as Yup from "yup";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import buscarAlunosMatriculados from "../../usecases/buscarAlunosMatriculados";
import buscarOficina from "../../usecases/buscarOficina";
import cadastrarOficina from "../../usecases/cadastrarOficina";
import editarOficina from "../../usecases/editarOficina";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  professor: Yup.string().required("O professor é obrigatório"),
  horario: Yup.string().required("O horário é obrigatório"),
  nivel: Yup.string().required("O nível da oficina é obrigatório"),
});

const Oficina: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  let { id } = useParams() ?? {};

  // const [novoAluno, setNovoAluno] = useState<boolean>(false)
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);

  const [pesquisa, setPesquisa] = useState("");
  const [alunos, setAlunos] = useState([]);

  const {
    register,
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
    const alunosMatriculados = Array.from(alunosSelecionados);
    alunosMatriculados.push({ id: aluno.id, nome: aluno.nome });
    setAlunosSelecionados(alunosMatriculados);
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
        toast({
          title: "Oficina salva com sucesso!",
          status: "success",
          duration: 2000,
        });

        return navigate("/oficinas");
      }
      return toast({
        title: "Falha ao salvar oficina! Por favor, tente novamente",
        status: "error",
        duration: 2000,
      });
    } else {
      const resultado = await cadastrarOficina(dados);

      if (resultado) {
        toast({
          title: "Oficina cadastrada com sucesso!",
          status: "success",
          duration: 2000,
        });

        return navigate("/oficinas");
      }

      return toast({
        title: "Falha ao cadastrar oficina! Por favor, tente novamente",
        status: "error",
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
          <Stack spacing={4}>
            <FormControl isInvalid={errors.nome}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register("nome")} />
              <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.professor}>
              <FormLabel>Professor</FormLabel>
              <Input type="text" {...register("professor")} />
              <FormErrorMessage>{errors?.professor?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.horario}>
              <FormLabel>Horário</FormLabel>
              <Input type="time" {...register("horario")} />
              <FormErrorMessage>{errors?.horario?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.nivel}>
              <FormLabel>Nível</FormLabel>
              <Input type="text" {...register("nivel")} />
              <FormErrorMessage>{errors?.nivel?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

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
                        adicionarAlunos(aluno);
                        setAlunos([]);
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack>
              <Text fontWeight="bold">Alunos selecionados para a oficina</Text>
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
                      onClick={() => {
                        const alunos = alunosSelecionados.filter(
                          (a) => aluno.id !== a.id
                        );
                        setAlunosSelecionados(alunos);
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Stack alignItems="flex-end" mt={10}>
            <Button type="submit" bg="#373861" color="white">
              Salvar
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default Oficina;
