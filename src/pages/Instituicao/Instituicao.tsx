import "./styles.css";

import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
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

import InputMask from "react-input-mask";

import { formatarCNPJ, formatarTelefone } from "../../utils/formatarStrings";

import buscarInformacoesInstituicao from "../../usecases/buscarInformacoesInstituicao";
import salvarInformacoesInstituicao from "../../usecases/salvarInformacoesInstituicao";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  cnpj: Yup.string()
    .required("O CNPJ é obrigatório")
    .matches(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/,
      "CNPJ inválido"
    ),
  endereco: Yup.string().required("O endereço é obrigatório"),
  email: Yup.string().required("O e-mail é obrigatório"),
  telefone: Yup.string()
    .required("O telefone é obrigatório")
    .matches(
      /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      "Telefone inválido"
    ),
});

const Instituicao: React.FC = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    buscarInformacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarInformacoes = async () => {
    const instituicao = await buscarInformacoesInstituicao();

    if (instituicao) {
      setValue("nome", instituicao?.nome);
      setValue("cnpj", formatarCNPJ(instituicao?.cnpj || ""));
      setValue("endereco", instituicao?.endereco ?? "");
      setValue("email", instituicao?.email);
      setValue("telefone", formatarTelefone(instituicao?.telefone || ""));
    }
  };

  const onSubmit = async ({
    nome,
    cnpj,
    endereco,
    email,
    telefone,
  }: {
    nome: string;
    cnpj: string;
    endereco: string;
    email: string;
    telefone: string;
  }) => {
    const resultado = await salvarInformacoesInstituicao({
      nome,
      cnpj: cnpj.replace(/[^0-9]+/g, ""),
      endereco,
      email,
      telefone: telefone.replace(/[^0-9]+/g, ""),
    });

    if (resultado) {
      return toast({
        title: "Informações salvas com sucesso!",
        status: "success",
        duration: 2000,
      });
    }

    return toast({
      title: "Falha ao salvar informações! Por favor, tente novamente",
      status: "error",
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
            <FormControl isInvalid={errors.nome}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register("nome")} />
              <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.cnpj}>
              <FormLabel>CNPJ</FormLabel>
              <Input
                type="text"
                {...register("cnpj")}
                as={InputMask}
                mask="99.999.999/9999-99"
                maskChar={null}
              />
              <FormErrorMessage>{errors?.cnpj?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.endereco}>
              <FormLabel>Endereço</FormLabel>
              <Input {...register("endereco")} type="text" />
              <FormErrorMessage>{errors?.endereco?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>E-mail</FormLabel>
              <Input {...register("email")} type="text" />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.telefone}>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="text"
                {...register("telefone")}
                as={InputMask}
                mask="(99) 9999-9999"
              />
              <FormErrorMessage>{errors?.telefone?.message}</FormErrorMessage>
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

export default Instituicao;
