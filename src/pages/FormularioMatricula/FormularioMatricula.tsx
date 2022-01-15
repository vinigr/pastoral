import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
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

import cadastrarMatriculaEAluno from "../../usecases/cadastrarMatriculaEAluno";
import pesquisarAlunos from "../../usecases/pesquisarAlunos";
import FormularioMatriculaAluno from "./FormularioMatriculaAluno";

const schemaAlunoCadastrado = Yup.object().shape({
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

const FormularioMatricula: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [novoAluno, setNovoAluno] = useState<boolean>(false);
  const [alunoSelecionado, setAlunoSelecionado] =
    useState<{ id: number; nome: string }>();

  const [pesquisa, setPesquisa] = useState("");

  const [alunos, setAlunos] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaAlunoCadastrado),
  });

  useEffect(() => {
    if (pesquisa) {
      buscarAlunos(pesquisa);
    } else {
      setAlunos([]);
    }
  }, [pesquisa]);

  const buscarAlunos = async (termoPesquisa) => {
    const alunosFiltrados = await pesquisarAlunos(termoPesquisa);

    setAlunos(alunosFiltrados);
  };

  const onSubmit = async ({
    escola,
    turno,
    turnoPastoral,
    serie,
    matriculaEscola,
    ano,
  }: any) => {
    if (!alunoSelecionado) {
      return toast({
        title: "Por favor, selecione um aluno para fazer a matrícula",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }

    const dados = {
      idAluno: alunoSelecionado.id,
      matricula: {
        escola,
        turno,
        matricula_escola: matriculaEscola,
        turno_pastoral: turnoPastoral,
        serie,
        data: new Date(),
        ano,
      },
    };

    const resultado = await cadastrarMatriculaEAluno(dados);

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

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Matrícula
      </Text>
      <div>
        <Checkbox
          defaultChecked={novoAluno ? true : false}
          value={novoAluno.toString()}
          onChange={(e) => {
            setNovoAluno(e.target.checked);
            setAlunoSelecionado(undefined);
          }}
        >
          Cadastrar novo aluno
        </Checkbox>
        {alunoSelecionado && (
          <IonItem>
            <IonLabel>Aluno: {alunoSelecionado?.nome}</IonLabel>
            <IonButton
              slot="end"
              onClick={() => setAlunoSelecionado(undefined)}
            >
              Alterar aluno
            </IonButton>
          </IonItem>
        )}
        {!alunoSelecionado && !novoAluno && (
          <>
            <IonSearchbar
              placeholder="Pesquisar aluno cadastrado"
              onIonChange={(e) => setPesquisa(e.detail.value!)}
            />
            <IonList>
              {alunos.map((aluno) => (
                <IonItem
                  button
                  key={aluno.id}
                  onClick={() => {
                    setPesquisa("");
                    setAlunoSelecionado(aluno);
                    setAlunos([]);
                  }}
                >
                  {aluno.nome}
                </IonItem>
              ))}
            </IonList>
          </>
        )}
        {!novoAluno && (
          <>
            <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
              Dados da matrícula
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
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
          </>
        )}
        {novoAluno && <FormularioMatriculaAluno />}
      </div>
    </>
  );
};

export default FormularioMatricula;
