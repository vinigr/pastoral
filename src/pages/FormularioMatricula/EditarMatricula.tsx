import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";

import buscarInformacoesMatriculaAluno from "../../usecases/buscarInformacoesMatriculaAluno";
import editarMatricula from "../../usecases/editarMatricula";

const schema = Yup.object().shape({
  ano: Yup.number()
    .integer("Por favor, informe o ano da matrícula")
    .typeError("Por favor, informe o ano da matrícula")
    .test(
      "len",
      "Por favor, informe o ano corretamente com 4 números",
      (val) => val && val.toString().length === 4
    ),
  escola: Yup.string().required("A escola é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
  turnoPastoral: Yup.string().required("O turno é obrigatório"),
  matriculaEscola: Yup.string().required("O matrícula da escola é obrigatória"),
});

const EditarMatricula: React.FC = () => {
  let { id } = useParams() ?? {};
  const navigate = useNavigate();
  const toast = useToast();

  const [dadosMatricula, setDadosMatricula] = useState<any>();

  useEffect(() => {
    if (id) {
      buscarInformacoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const buscarInformacoes = async () => {
    const alunoMatricula = await buscarInformacoesMatriculaAluno(id);

    setValue("ano", alunoMatricula?.ano);
    setValue("escola", alunoMatricula?.escola);
    setValue("serie", alunoMatricula?.serie);
    setValue("turno", alunoMatricula?.turno);
    setValue("turnoPastoral", alunoMatricula?.turno_pastoral);
    setValue("matriculaEscola", alunoMatricula?.matricula_escola);

    setDadosMatricula(alunoMatricula);
  };

  const onSubmitMatricula = async ({
    escola,
    serie,
    turno,
    turnoPastoral,
    matriculaEscola,
    ano,
  }) => {
    const resultado = await editarMatricula(id, {
      ano,
      escola,
      turno,
      turno_pastoral: turnoPastoral,
      serie,
      matricula_escola: matriculaEscola,
    });

    if (resultado) {
      toast({
        title: "Matrícula salva com sucesso!",
        status: "success",
        position: "top-right",
        duration: 2000,
      });

      return navigate("/matriculas");
    }
    return toast({
      title: "Falha ao salvar matrícula! Por favor, tente novamente",
      status: "error",
      position: "top-right",
      duration: 2000,
    });
  };

  if (!dadosMatricula && !getValues("turno")) {
    return <></>;
  }

  return (
    <div>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Dados da matrícula
      </Text>
      <form onSubmit={handleSubmit(onSubmitMatricula)}>
        <Stack spacing={4}>
          <Stack direction="row">
            <Text fontWeight="semibold">Aluno:</Text>
            <Text>{dadosMatricula?.aluno?.nome}</Text>
          </Stack>
          <FormControl isInvalid={Boolean(errors?.ano)}>
            <FormLabel>Ano</FormLabel>
            <Input type="number" {...register("ano")} />
            <FormErrorMessage>{errors?.ano?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.escola)}>
            <FormLabel>Escola</FormLabel>
            <Input type="text" {...register("escola")} />
            <FormErrorMessage>{errors?.escola?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.serie)}>
            <FormLabel>Série</FormLabel>
            <Input type="text" {...register("serie")} />
            <FormErrorMessage>{errors?.serie?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.matriculaEscola)}>
            <FormLabel>Matrícula da escola</FormLabel>
            <Input type="text" {...register("matriculaEscola")} />
            <FormErrorMessage>
              {errors?.matriculaEscola?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.turno)}>
            <FormLabel>Turno na escola</FormLabel>
            <Controller
              render={({ field: { value } }) => {
                return (
                  <RadioGroup
                    defaultValue={value}
                    name="turno"
                    onChange={(e: any) => {
                      setValue("turno", e);
                      if (e === "matutino") {
                        return setValue("turnoPastoral", "vespertino");
                      }

                      return setValue("turnoPastoral", "matutino");
                    }}
                  >
                    <Stack direction="row">
                      <Radio value="matutino">Matutino</Radio>
                      <Radio value="vespertino">Vespertino</Radio>
                    </Stack>
                  </RadioGroup>
                );
              }}
              name="turno"
              control={control}
            />
            <FormErrorMessage>{errors?.turno?.message}</FormErrorMessage>
          </FormControl>
          {watch("turnoPastoral") && (
            <Flex>
              <Text fontWeight="bold" mr={2}>
                Turno na pastoral:
              </Text>
              <Text>
                {watch("turnoPastoral") === "matutino"
                  ? "Matutino"
                  : "Vespertino"}
              </Text>
            </Flex>
          )}
        </Stack>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditarMatricula;
