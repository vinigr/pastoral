import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
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

import editarAluno from "../../usecases/editarAluno";

const schema = Yup.object().shape({
  usuario: Yup.string().required("O usuário é obrigatório"),
  senha: Yup.string().required("A senha é obrigatória"),
});

const Usuario: React.FC = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    usuario,
    senha,
  }: {
    usuario: string;
    senha: string;
  }) => {
    const resultado = await editarAluno(usuario, senha);

    if (resultado) {
      return toast({
        title: "Informações salvas com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });
    }

    return toast({
      title: "Falha ao salvar informações! Por favor, tente novamente",
      status: "error",
      position: "top-right",
      duration: 2000,
    });
  };

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Instituição
      </Text>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.usuario}>
              <FormLabel>Usuário</FormLabel>
              <Input type="text" {...register("usuario")} />
              <FormErrorMessage>{errors?.usuario?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.senha}>
              <FormLabel>Senha</FormLabel>
              <Input {...register("senha")} type="text" />
              <FormErrorMessage>{errors?.senha?.message}</FormErrorMessage>
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

export default Usuario;
