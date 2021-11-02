import "./styles.css";

import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { useIonRouter } from "@ionic/react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";

import React from "react";
import fazerLogin from "../../usecases/fazerLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  usuario: Yup.string().required("O usuário é necessário"),
  senha: Yup.string().required("A senha é necessária"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
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
    const resultado = await fazerLogin(usuario, senha);

    if (resultado) {
      navigate("/matriculas");
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Pastoral do menor</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Login
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="usuario" isInvalid={errors.usuario}>
                <FormLabel>Usuário</FormLabel>
                <Input type="text" {...register("usuario")} />
                <FormErrorMessage>{errors?.usuario?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="senha" isInvalid={errors.senha}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    {...register("senha")}
                    autoComplete="current-password"
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.senha?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
