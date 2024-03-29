import "./styles.css";

import * as Yup from "yup";

import { useForm } from "react-hook-form";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  InputGroup,
  FormErrorMessage,
  useToast,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";

import React from "react";
import fazerLogin from "../../usecases/fazerLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import pastoralLogo from "../../assets/images/pastoral-menor.jpg";

const shell = window.require ? window?.require("electron").shell : null;

const schema = Yup.object().shape({
  usuario: Yup.string().required("O usuário é necessário"),
  senha: Yup.string().required("A senha é necessária"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

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
      localStorage.setItem("logado", "true");

      return navigate("/matriculas");
    }

    return toast({
      title: "Usuário ou senha incorretos!",
      status: "error",
      position: "top-right",
      duration: 2000,
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg="white"
      direction={"column"}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        justify="center"
        align={"center"}
      >
        <Image src={pastoralLogo} width={200} />
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8} width={"3xl"}>
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

      <Flex direction="column" alignItems="center">
        <Text>Desenvolvido por:</Text>
        <Flex mb={2}>
          <Text fontWeight={"bold"} mr={4}>
            Daniel Costa Carvalho
          </Text>
          <Link
            color="blue"
            target="_blank"
            onClick={() =>
              shell?.openExternal("https://github.com/DanielCostaCarvalho")
            }
          >
            @DanielCostaCarvalho
          </Link>
        </Flex>
        <Flex mb={2}>
          <Text fontWeight={"bold"} mr={4}>
            Pedro Henrique Ribeiro Silva
          </Text>
          <Link
            color="blue"
            target="_blank"
            onClick={() =>
              shell?.openExternal("https://github.com/itspedrohrs")
            }
          >
            @itspedrohrs
          </Link>
        </Flex>
        <Flex mb={2}>
          <Text fontWeight={"bold"} mr={4}>
            Vinícios Oliveira Grama
          </Text>
          <Link
            color="blue"
            target="_blank"
            onClick={() => shell?.openExternal("https://github.com/vinigr")}
          >
            @vinigr
          </Link>
        </Flex>

        <Flex mb={2}>
          <Link
            color="blue"
            target="_blank"
            onClick={() =>
              shell?.openExternal("https://github.com/vinigr/pastoral")
            }
          >
            Repositório
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
