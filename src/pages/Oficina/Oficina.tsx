import * as Yup from "yup";

import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import buscarOficina from "../../usecases/buscarOficina";
import cadastrarOficina from "../../usecases/cadastrarOficina";
import editarOficina from "../../usecases/editarOficina";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

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
          position: "top-right",
          duration: 2000,
        });

        return navigate("/oficinas");
      }
      return toast({
        title: "Falha ao salvar oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    } else {
      const resultado = await cadastrarOficina(dados);

      if (resultado) {
        toast({
          title: "Oficina cadastrada com sucesso!",
          status: "success",
          position: "top-right",
          duration: 2000,
        });

        return navigate("/oficinas");
      }

      return toast({
        title: "Falha ao cadastrar oficina! Por favor, tente novamente",
        status: "error",
        position: "top-right",
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
              <Input type="text" {...register("horario")} />
              <FormErrorMessage>{errors?.horario?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.nivel}>
              <FormLabel>Nível</FormLabel>
              <Input type="text" {...register("nivel")} />
              <FormErrorMessage>{errors?.nivel?.message}</FormErrorMessage>
            </FormControl>
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
