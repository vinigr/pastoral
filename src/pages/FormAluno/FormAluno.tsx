import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { IonButton, IonTitle, useIonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { formatarCpf, formatarDinheiro } from "../../utils/formatarStrings";

import InputMask from "react-input-mask";

import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  Checkbox,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";

import buscarInformacoesAluno from "../../usecases/buscarInformacoesAluno";
import editarAluno from "../../usecases/editarAluno";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  sexo: Yup.string().required("A escolha do sexo é obrigatória"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/, "CPF inválido"),
  dataNascimento: Yup.string().required("A data de nascimento é obrigatória"),
  rg: Yup.string().required("O RG é obrigatório"),
  dataExpedicao: Yup.string().required(
    "A data de expedição do RG é obrigatória"
  ),
  endereco: Yup.string().required("O endereço é obrigatório"),
  naturalidade: Yup.string().required("A naturalidade é obrigatória"),
  nacionalidade: Yup.string().required("A nacionalidade é obrigatória"),
  termoCN: Yup.string().required(
    "O termo da certidão de nascimento é obrigatório"
  ),
  folhaCN: Yup.string().required(
    "A folha da certidão de nascimento é obrigatória"
  ),
  livroCN: Yup.string().required(
    "O livro da certidão de nascimento é obrigatório"
  ),
  email: Yup.string().required("O e-mail é obrigatório"),
  telefone: Yup.string().required("O telefone é obrigatório"),
  nomeContatoUrgencia: Yup.string().required(
    "O nome de contato de urgência é obrigatório"
  ),
  telefoneContatoUrgencia: Yup.string().required(
    "O telefonem do contato de urgência é obrigatório"
  ),
  parentesco: Yup.string().required(
    "É necessário informar quem é o responsável"
  ),
  nomeResponsavel: Yup.string().required("O nome é obrigatório"),
  cpfResponsavel: Yup.string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/, "CPF inválido"),
  enderecoResponsavel: Yup.string().required("O endereço é obrigatório"),
  telefoneResponsavel: Yup.string().required("O telefone é obrigatório"),
  ocupacaoProfissionalResponsavel: Yup.string().required(
    "A ocupação profissional é obrigatória"
  ),
  rgResponsavel: Yup.string().required("O RG é obrigatório"),
  rendaFamiliar: Yup.string().required("A renda familiar é obrigatória"),
  religiao: Yup.string(),
});

const FormAluno: React.FC = () => {
  const toast = useToast();
  let { id } = useParams() ?? {};

  const [aluno, setAluno] = useState();

  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
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
    const alunoMatricula = await buscarInformacoesAluno(id);

    setValue("nome", alunoMatricula?.nome);
    setValue("sexo", alunoMatricula?.sexo);
    setValue("cpf", alunoMatricula?.cpf);
    setValue("dataNascimento", alunoMatricula.dataNascimento);
    setValue("rg", alunoMatricula?.rg);
    setValue("dataExpedicao", alunoMatricula?.dataExpedicao);
    setValue("endereco", alunoMatricula?.endereco);
    setValue("naturalidade", alunoMatricula?.naturalidade);
    setValue("nacionalidade", alunoMatricula?.nacionalidade);
    setValue("termoCN", alunoMatricula?.termoCN);
    setValue("folhaCN", alunoMatricula?.folhaCN);
    setValue("livroCN", alunoMatricula?.livroCN);
    setValue("email", alunoMatricula?.email);
    setValue("telefone", alunoMatricula?.telefone);
    setValue("temParente", alunoMatricula?.temParente);
    setValue("nomeParente", alunoMatricula?.nomeParente);
    setValue("nomeContatoUrgencia", alunoMatricula?.nomeContatoUrgencia);
    setValue(
      "telefoneContatoUrgencia",
      alunoMatricula?.telefoneContatoUrgencia
    );
    setValue("parentesco", alunoMatricula?.parentesco);
    setValue("nomeResponsavel", alunoMatricula?.nomeResponsavel);
    setValue(
      "cpfResponsavel",
      formatarCpf(alunoMatricula?.cpfResponsavel || "")
    );
    setValue("enderecoResponsavel", alunoMatricula?.enderecoResponsavel);
    setValue("telefoneResponsavel", alunoMatricula?.telefoneResponsavel);
    setValue(
      "ocupacaoProfissionalResponsavel",
      alunoMatricula?.ocupacaoProfissionalResponsavel
    );
    setValue("bolsaSocial", alunoMatricula?.bolsaSocial);
    setValue("nis", alunoMatricula?.nis);
    setValue("rgResponsavel", alunoMatricula?.rgResponsavel);
    setValue("rendaFamiliar", alunoMatricula?.rendaFamiliar);
    setValue("religiao", alunoMatricula?.religiao);

    setAluno(alunoMatricula);
  };

  const temParente = watch("temParente", false);
  const bolsaSocial = watch("bolsaSocial", false);

  const onSubmit = async ({
    nome,
    sexo,
    cpf,
    dataNascimento,
    rg,
    dataExpedicao,
    endereco,
    naturalidade,
    nacionalidade,
    termoCN,
    folhaCN,
    livroCN,
    email,
    telefone,
    temParente,
    nomeParente,
    nomeContatoUrgencia,
    telefoneContatoUrgencia,
    parentesco,
    nomeResponsavel,
    cpfResponsavel,
    enderecoResponsavel,
    telefoneResponsavel,
    ocupacaoProfissionalResponsavel,
    bolsaSocial,
    nis,
    rgResponsavel,
    rendaFamiliar,
    religiao,
  }: any) => {
    const dados = {
      aluno: {
        nome,
        sexo,
        cpf: cpf.replace(/[^0-9]+/g, ""),
        dataNascimento,
        rg,
        dataExpedicao,
        endereco,
        naturalidade,
        nacionalidade,
        termoCN,
        folhaCN,
        livroCN,
        email,
        telefone: telefone.replace(/[^0-9]+/g, ""),
        temParente,
        nomeParente,
        nomeContatoUrgencia,
        telefoneContatoUrgencia: telefoneContatoUrgencia.replace(
          /[^0-9]+/g,
          ""
        ),
      },
      responsavel: {
        parentesco,
        nome: nomeResponsavel,
        cpf: cpfResponsavel.replace(/[^0-9]+/g, ""),
        endereco: enderecoResponsavel,
        telefone: telefoneResponsavel,
        ocupacaoProfissional: ocupacaoProfissionalResponsavel,
        bolsaSocial,
        nis,
        rg: rgResponsavel,
        rendaFamiliar,
        religiao,
      },
    };

    if (id) {
      const resultado = await editarAluno(id, dados);

      if (resultado) {
        return toast({
          title: "Matrícula salva com sucesso!",
          status: "success",
          position: "top-right",
          duration: 2000,
        });
      }
      return toast({
        title: "Falha ao salvar matrícula! Por favor, tente novamente",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }
  };

  if (!aluno) {
    return <></>;
  }

  return (
    <Box>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Aluno
      </Text>
      <div>
        <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
          Dados do aluno
        </IonTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.nome}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register("nome")} />
              <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.sexo}>
              <FormLabel>Sexo</FormLabel>
              <Controller
                render={({ field: { value } }) => (
                  <RadioGroup
                    defaultValue={value}
                    name="sexo"
                    onChange={(e: any) => {
                      setValue("sexo", e);
                    }}
                  >
                    <Stack direction="row">
                      <Radio value="masculino">Matutino</Radio>
                      <Radio value="feminino">Feminino</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                name="sexo"
                control={control}
              />
              <FormErrorMessage>{errors?.sexo?.message}</FormErrorMessage>
            </FormControl>

            <Stack direction="row">
              <FormControl isInvalid={errors.cpf}>
                <FormLabel>CPF</FormLabel>
                <Input
                  type="text"
                  {...register("cpf")}
                  as={InputMask}
                  mask="999.999.999-99"
                  maskChar={null}
                />
                <FormErrorMessage>{errors?.cpf?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.dataNascimento}>
                <FormLabel>Data de nascimento</FormLabel>
                <Input type="date" {...register("dataNascimento")} />
                <FormErrorMessage>
                  {errors?.dataNascimento?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.rg}>
                <FormLabel>RG</FormLabel>
                <Input type="text" {...register("rg")} />
                <FormErrorMessage>{errors?.rg?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.dataExpedicao}>
                <FormLabel>Data de expedição</FormLabel>
                <Input type="date" {...register("dataExpedicao")} />
                <FormErrorMessage>
                  {errors?.dataExpedicao?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <FormControl isInvalid={errors.endereco}>
              <FormLabel>Endereço</FormLabel>
              <Input type="text" {...register("endereco")} />
              <FormErrorMessage>{errors?.endereco?.message}</FormErrorMessage>
            </FormControl>

            <Stack direction="row">
              <FormControl isInvalid={errors.naturalidade}>
                <FormLabel>Naturalidade</FormLabel>
                <Input type="text" {...register("naturalidade")} />
                <FormErrorMessage>
                  {errors?.naturalidade?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.nacionalidade}>
                <FormLabel>Nacionalidade</FormLabel>
                <Input type="text" {...register("nacionalidade")} />
                <FormErrorMessage>
                  {errors?.nacionalidade?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <Stack>
              <FormLabel fontSize={20}>Certidão de nascimento</FormLabel>

              <Stack direction="row">
                <FormControl isInvalid={errors.termoCN}>
                  <FormLabel>Termo</FormLabel>
                  <Input type="text" {...register("termoCN")} />
                  <FormErrorMessage>
                    {errors?.termoCN?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.folhaCN}>
                  <FormLabel>Folha</FormLabel>
                  <Input type="text" {...register("folhaCN")} />
                  <FormErrorMessage>
                    {errors?.folhaCN?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.livroCN}>
                  <FormLabel>Livro</FormLabel>
                  <Input type="text" {...register("livroCN")} />
                  <FormErrorMessage>
                    {errors?.livroCN?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>

            <FormControl isInvalid={errors.email}>
              <FormLabel>E-mail</FormLabel>
              <Input type="email" {...register("email")} />
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

            <Stack spacing={4}>
              <FormControl isInvalid={errors.temParente}>
                <Controller
                  render={({ field: { value } }) => (
                    <Checkbox
                      defaultChecked={value}
                      onChange={(e) => setValue("temParente", e.target.checked)}
                    >
                      Tem parente na pastoral
                    </Checkbox>
                  )}
                  name="temParente"
                  control={control}
                />
                <FormErrorMessage>
                  {errors?.temParente?.message}
                </FormErrorMessage>
              </FormControl>

              {temParente && (
                <FormControl isInvalid={errors.nomeParente}>
                  <FormLabel>Especificar o nome do parente</FormLabel>
                  <Input type="text" {...register("nomeParente")} />
                  <FormErrorMessage>
                    {errors?.nomeParente?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Stack>

            <Stack>
              <FormLabel>Contato de urgência</FormLabel>

              <Stack direction="row">
                <FormControl isInvalid={errors.nomeContatoUrgencia}>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" {...register("nomeContatoUrgencia")} />
                  <FormErrorMessage>
                    {errors?.nomeContatoUrgencia?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.telefoneContatoUrgencia}>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="text"
                    {...register("telefoneContatoUrgencia")}
                    as={InputMask}
                    mask="(99) 99999-9999"
                  />
                  <FormErrorMessage>
                    {errors?.telefoneContatoUrgencia?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>

            <Stack>
              <FormLabel fontSize={20}>Dados do responsável</FormLabel>

              <Stack spacing={4}>
                <FormControl isInvalid={errors.parentesco}>
                  <FormLabel>Responsável pelo aluno</FormLabel>
                  <Controller
                    render={({ field: { value } }) => {
                      return (
                        <RadioGroup name="parentesco" defaultValue={value}>
                          <Stack
                            spacing={2}
                            direction="row"
                            onChange={(e: any) => {
                              setValue("parentesco", e.target.value);
                            }}
                          >
                            <Radio value="pai">Pai</Radio>
                            <Radio value="mae">Mãe</Radio>
                            <Radio value="avo">Avô/Avó</Radio>
                            <Radio value="outros">Outros</Radio>
                          </Stack>
                        </RadioGroup>
                      );
                    }}
                    name="parentesco"
                    control={control}
                  />
                  <FormErrorMessage>
                    {errors?.parentesco?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.nomeResponsavel}>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" {...register("nomeResponsavel")} />
                  <FormErrorMessage>
                    {errors?.nomeResponsavel?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack direction="row">
                  <FormControl isInvalid={errors.cpfResponsavel}>
                    <FormLabel>CPF</FormLabel>
                    <Input
                      type="text"
                      {...register("cpfResponsavel")}
                      as={InputMask}
                      mask="999.999.999-99"
                      maskChar={null}
                    />
                    <FormErrorMessage>
                      {errors?.cpfResponsavel?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.rgResponsavel}>
                    <FormLabel>RG</FormLabel>
                    <Input type="text" {...register("rgResponsavel")} />
                    <FormErrorMessage>
                      {errors?.rgResponsavel?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <FormControl isInvalid={errors.enderecoResponsavel}>
                  <FormLabel>Endereço</FormLabel>
                  <Input type="text" {...register("enderecoResponsavel")} />
                  <FormErrorMessage>
                    {errors?.enderecoResponsavel?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.telefoneResponsavel}>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="text"
                    {...register("telefoneResponsavel")}
                    as={InputMask}
                    mask="(99) 99999-9999"
                  />
                  <FormErrorMessage>
                    {errors?.telefoneResponsavel?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={errors.bolsaSocial}>
                <Controller
                  render={({ field: { value } }) => (
                    <Checkbox
                      defaultChecked={value}
                      onChange={(e) =>
                        setValue("bolsaSocial", e.target.checked)
                      }
                    >
                      Possui bolsa social
                    </Checkbox>
                  )}
                  name="bolsaSocial"
                  control={control}
                />
                <FormErrorMessage>
                  {errors?.bolsaSocial?.message}
                </FormErrorMessage>
              </FormControl>

              {bolsaSocial && (
                <FormControl isInvalid={errors.nis}>
                  <FormLabel>NIS</FormLabel>
                  <Input type="text" {...register("nis")} />
                  <FormErrorMessage>{errors?.nis?.message}</FormErrorMessage>
                </FormControl>
              )}
            </Stack>

            <FormControl isInvalid={errors.ocupacaoProfissionalResponsavel}>
              <FormLabel>Ocupação profissional</FormLabel>
              <Input
                type="text"
                {...register("ocupacaoProfissionalResponsavel")}
              />
              <FormErrorMessage>
                {errors?.ocupacaoProfissionalResponsavel?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.rendaFamiliar}>
              <FormLabel>Renda familiar</FormLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChange={(e) => {
                      onChange({
                        target: {
                          name: "rendaFamiliar",
                          value: formatarDinheiro(e?.target?.value || ""),
                        },
                      });
                    }}
                    onBlur={onBlur}
                    type="text"
                  />
                )}
                name="rendaFamiliar"
                rules={{ required: true }}
              />
              <FormErrorMessage>
                {errors?.rendaFamiliar?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.religiao}>
              <Controller
                render={({ field: { value } }) => (
                  <Checkbox
                    defaultChecked={value}
                    onChange={(e) => setValue("religiao", e.target.checked)}
                  >
                    Permite catequese
                  </Checkbox>
                )}
                name="religiao"
                control={control}
              />
              <FormErrorMessage>{errors?.religiao?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IonButton type="submit">Salvar</IonButton>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default FormAluno;
