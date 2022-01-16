import * as Yup from "yup";

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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cadastrarMatriculaEAluno from "../../usecases/cadastrarMatriculaEAluno";
import { useNavigate } from "react-router";
import {
  formatarCPF,
  formatarDinheiro,
  formatarTelefone,
} from "../../utils/formatarStrings";

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
  sexo: Yup.string().required("A escolha do sexo é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
  matriculaEscola: Yup.string().required("O matrícula da escola é obrigatória"),
  turnoPastoral: Yup.string().required("O turno é obrigatório"),
  nome: Yup.string().required("O nome é obrigatório"),
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
  certidaoNova: Yup.boolean(),
  numeroCertidao: Yup.mixed().when("certidaoNova", {
    is: true,
    then: Yup.string().required(
      "O código da certidão de nascimento é obrigatório"
    ),
    otherwise: Yup.mixed().nullable(),
  }),
  termoCN: Yup.mixed().when("certidaoNova", {
    is: (value) => !value,
    then: Yup.string().required(
      "O termo da certidão de nascimento é obrigatório"
    ),
    otherwise: Yup.mixed().nullable(),
  }),
  folhaCN: Yup.mixed().when("certidaoNova", {
    is: (value) => !value,
    then: Yup.string().required(
      "A folha da certidão de nascimento é obrigatória"
    ),
    otherwise: Yup.mixed().nullable(),
  }),
  livroCN: Yup.mixed().when("certidaoNova", {
    is: (value) => !value,
    then: Yup.string().required(
      "O livro da certidão de nascimento é obrigatório"
    ),
    otherwise: Yup.mixed().nullable(),
  }),
  email: Yup.string(),
  telefone: Yup.string().required("O telefone é obrigatório"),
  temParente: Yup.boolean(),
  nomeParente: Yup.string(),
  nomeContatoUrgencia: Yup.string().required(
    "O nome de contato de urgência é obrigatório"
  ),
  telefoneContatoUrgencia: Yup.string().required(
    "O telefone do contato de urgência é obrigatório"
  ),
  afinidades: Yup.string(),
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
  religiao: Yup.boolean(),
});

const FormularioMatriculaAluno: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    certidaoNova,
    numeroCertidao,
    termoCN,
    folhaCN,
    livroCN,
    email,
    telefone,
    temParente,
    nomeParente,
    nomeContatoUrgencia,
    telefoneContatoUrgencia,
    afinidades,
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
    escola,
    turno,
    turnoPastoral,
    serie,
    matriculaEscola,
    ano,
  }: any) => {
    const dados = {
      aluno: {
        nome,
        sexo,
        cpf: cpf.replace(/[^0-9]+/g, ""),
        data_nascimento: dataNascimento,
        rg,
        data_expedicao_rg: dataExpedicao,
        endereco,
        naturalidade,
        nacionalidade,
        certidao_nova: certidaoNova,
        certidao_codigo: numeroCertidao,
        certidao_nascimento_termo: termoCN,
        certidao_nascimento_folha: folhaCN,
        certidao_nascimento_livro: livroCN,
        email,
        telefone: telefone.replace(/[^0-9]+/g, ""),
        tem_parente: Boolean(temParente),
        nome_parente: nomeParente ?? "",
        contato_nome: nomeContatoUrgencia,
        contato_telefone: telefoneContatoUrgencia.replace(/[^0-9]+/g, ""),
        afinidades,
        responsavel_tipo: parentesco,
        responsavel_nome: nomeResponsavel,
        responsavel_cpf: cpfResponsavel.replace(/[^0-9]+/g, ""),
        responsavel_endereco: enderecoResponsavel,
        responsavel_telefone: telefoneResponsavel,
        responsavel_profissao: ocupacaoProfissionalResponsavel,
        responsavel_recebe_auxilio: bolsaSocial ?? false,
        responsavel_nis: nis,
        responsavel_rg: rgResponsavel,
        renda_familiar: rendaFamiliar.replace(/\D/g, ""),
        permite_catequese: religiao,
      },
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

  const temParente = watch("temParente", false);
  const bolsaSocial = watch("bolsaSocial", undefined);
  const certidaoNova = watch("certidaoNova", undefined);

  return (
    <>
      <Text fontWeight="bold" fontSize={20} marginY={6}>
        Dados do aluno
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors.nome)}>
            <FormLabel>Nome</FormLabel>
            <Input type="text" {...register("nome")} />
            <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.sexo)}>
            <FormLabel>Sexo</FormLabel>
            <Controller
              render={({ field: { value } }) => (
                <RadioGroup
                  defaultValue={value}
                  name="sexo"
                  onChange={(e) => {
                    setValue("sexo", e);
                  }}
                >
                  <Stack direction="row">
                    <Radio value="masculino">Masculino</Radio>
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
            <FormControl isInvalid={Boolean(errors.cpf)}>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                {...register("cpf")}
                onChange={(e) => setValue("cpf", formatarCPF(e.target.value))}
              />
              <FormErrorMessage>{errors?.cpf?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.dataNascimento)}>
              <FormLabel>Data de nascimento</FormLabel>
              <Input type="date" {...register("dataNascimento")} />
              <FormErrorMessage>
                {errors?.dataNascimento?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.rg)}>
              <FormLabel>RG</FormLabel>
              <Input type="text" {...register("rg")} />
              <FormErrorMessage>{errors?.rg?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.dataExpedicao)}>
              <FormLabel>Data de expedição</FormLabel>
              <Input type="date" {...register("dataExpedicao")} />
              <FormErrorMessage>
                {errors?.dataExpedicao?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={Boolean(errors.endereco)}>
            <FormLabel>Endereço</FormLabel>
            <Input type="text" {...register("endereco")} />
            <FormErrorMessage>{errors?.endereco?.message}</FormErrorMessage>
          </FormControl>

          <Stack direction="row">
            <FormControl isInvalid={Boolean(errors.naturalidade)}>
              <FormLabel>Naturalidade</FormLabel>
              <Input type="text" {...register("naturalidade")} />
              <FormErrorMessage>
                {errors?.naturalidade?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.nacionalidade)}>
              <FormLabel>Nacionalidade</FormLabel>
              <Input type="text" {...register("nacionalidade")} />
              <FormErrorMessage>
                {errors?.nacionalidade?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Stack>
            <FormLabel fontSize={20}>Certidão de nascimento</FormLabel>

            <FormControl isInvalid={Boolean(errors.certidaoNova)}>
              <Controller
                render={({ field: { value } }) => (
                  <Checkbox
                    defaultChecked={value}
                    onChange={(e) => setValue("certidaoNova", e.target.checked)}
                  >
                    Certidão nova
                  </Checkbox>
                )}
                name="certidaoNova"
                control={control}
              />
              <FormErrorMessage>
                {errors?.certidaoNova?.message}
              </FormErrorMessage>
            </FormControl>

            {certidaoNova ? (
              <FormControl isInvalid={Boolean(errors.numeroCertidao)}>
                <FormLabel>Código da certidão</FormLabel>
                <Input type="text" {...register("numeroCertidao")} />
                <FormErrorMessage>
                  {errors?.numeroCertidao?.message}
                </FormErrorMessage>
              </FormControl>
            ) : (
              <Stack direction="row">
                <FormControl isInvalid={Boolean(errors.termoCN)}>
                  <FormLabel>Termo</FormLabel>
                  <Input type="text" {...register("termoCN")} />
                  <FormErrorMessage>
                    {errors?.termoCN?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.folhaCN)}>
                  <FormLabel>Folha</FormLabel>
                  <Input type="text" {...register("folhaCN")} />
                  <FormErrorMessage>
                    {errors?.folhaCN?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.livroCN)}>
                  <FormLabel>Livro</FormLabel>
                  <Input type="text" {...register("livroCN")} />
                  <FormErrorMessage>
                    {errors?.livroCN?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            )}
          </Stack>

          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.telefone)}>
            <FormLabel>Telefone</FormLabel>
            <Input
              type="text"
              {...register("telefone")}
              onChange={(e) =>
                setValue("telefone", formatarTelefone(e.target.value))
              }
            />
            <FormErrorMessage>{errors?.telefone?.message}</FormErrorMessage>
          </FormControl>

          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.temParente)}>
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
              <FormErrorMessage>{errors?.temParente?.message}</FormErrorMessage>
            </FormControl>

            {temParente && (
              <FormControl isInvalid={Boolean(errors.nomeParente)}>
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
              <FormControl isInvalid={Boolean(errors.nomeContatoUrgencia)}>
                <FormLabel>Nome</FormLabel>
                <Input type="text" {...register("nomeContatoUrgencia")} />
                <FormErrorMessage>
                  {errors?.nomeContatoUrgencia?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.telefoneContatoUrgencia)}>
                <FormLabel>Celular</FormLabel>
                <Input
                  type="text"
                  {...register("telefoneContatoUrgencia")}
                  onChange={(e) =>
                    setValue(
                      "telefoneContatoUrgencia",
                      formatarTelefone(e.target.value)
                    )
                  }
                />
                <FormErrorMessage>
                  {errors?.telefoneContatoUrgencia?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </Stack>

          <FormControl isInvalid={errors.afinidades}>
            <FormLabel>Afinidades do aluno</FormLabel>
            <Input type="afinidades" {...register("afinidades")} />
            <FormErrorMessage>{errors?.afinidades?.message}</FormErrorMessage>
          </FormControl>

          <Stack>
            <FormLabel fontSize={20}>Dados do responsável</FormLabel>

            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.parentesco)}>
                <FormLabel>Responsável pelo aluno</FormLabel>
                <Controller
                  render={({ field: { value } }) => (
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
                  )}
                  name="parentesco"
                  control={control}
                />
                <FormErrorMessage>
                  {errors?.parentesco?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.nomeResponsavel)}>
                <FormLabel>Nome</FormLabel>
                <Input type="text" {...register("nomeResponsavel")} />
                <FormErrorMessage>
                  {errors?.nomeResponsavel?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack direction="row">
                <FormControl isInvalid={Boolean(errors.cpfResponsavel)}>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    type="text"
                    {...register("cpfResponsavel")}
                    onChange={(e) =>
                      setValue("cpfResponsavel", formatarCPF(e.target.value))
                    }
                  />
                  <FormErrorMessage>
                    {errors?.cpfResponsavel?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.rgResponsavel)}>
                  <FormLabel>RG</FormLabel>
                  <Input type="text" {...register("rgResponsavel")} />
                  <FormErrorMessage>
                    {errors?.rgResponsavel?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <FormControl isInvalid={Boolean(errors.enderecoResponsavel)}>
                <FormLabel>Endereço</FormLabel>
                <Input type="text" {...register("enderecoResponsavel")} />
                <FormErrorMessage>
                  {errors?.enderecoResponsavel?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.telefoneResponsavel)}>
                <FormLabel>Celular</FormLabel>
                <Input
                  type="text"
                  {...register("telefoneResponsavel")}
                  onChange={(e) =>
                    setValue(
                      "telefoneResponsavel",
                      formatarTelefone(e.target.value)
                    )
                  }
                />
                <FormErrorMessage>
                  {errors?.telefoneResponsavel?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.bolsaSocial)}>
              <Controller
                render={({ field: { value } }) => (
                  <Checkbox
                    defaultChecked={value}
                    onChange={(e) => setValue("bolsaSocial", e.target.checked)}
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
              <FormControl isInvalid={Boolean(errors.nis)}>
                <FormLabel>NIS</FormLabel>
                <Input type="text" {...register("nis")} />
                <FormErrorMessage>{errors?.nis?.message}</FormErrorMessage>
              </FormControl>
            )}
          </Stack>

          <FormControl
            isInvalid={Boolean(errors.ocupacaoProfissionalResponsavel)}
          >
            <FormLabel>Ocupação profissional</FormLabel>
            <Input
              type="text"
              {...register("ocupacaoProfissionalResponsavel")}
            />
            <FormErrorMessage>
              {errors?.ocupacaoProfissionalResponsavel?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.rendaFamiliar)}>
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

          <FormControl isInvalid={Boolean(errors.religiao)}>
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

        <Text fontWeight="bold" fontSize={20} marginY={6}>
          Dados da matrícula
        </Text>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors?.ano)}>
            <FormLabel>Ano</FormLabel>
            <Input type="number" {...register("ano")} />
            <FormErrorMessage>{errors?.ano?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.escola)}>
            <FormLabel>Escola</FormLabel>
            <Input type="text" {...register("escola")} />
            <FormErrorMessage>{errors?.escola?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.serie)}>
            <FormLabel>Série</FormLabel>
            <Input type="text" {...register("serie")} />
            <FormErrorMessage>{errors?.serie?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.matriculaEscola)}>
            <FormLabel>Matrícula da escola</FormLabel>
            <Input type="text" {...register("matriculaEscola")} />
            <FormErrorMessage>
              {errors?.matriculaEscola?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.turno)}>
            <FormLabel>Turno na escola</FormLabel>
            <Controller
              render={({ field: { value } }) => (
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
              )}
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
  );
};

export default FormularioMatriculaAluno;
