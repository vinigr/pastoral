import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  formatarCPF,
  formatarDinheiro,
  formatarTelefone,
} from "../../utils/formatarStrings";
import { useNavigate, useParams } from "react-router-dom";

import buscarInformacoesMatriculaAluno from "../../usecases/buscarInformacoesMatriculaAluno";
import cadastrarMatriculaEAluno from "../../usecases/cadastrarMatriculaEAluno";
import editarMatricula from "../../usecases/editarMatricula";
import pesquisarAlunos from "../../usecases/pesquisarAlunos";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
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

const schema = Yup.object().shape({
  escola: Yup.string().required("A escola é obrigatória"),
  sexo: Yup.string().required("A escolha do sexo é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
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
      "O número da certidão de nascimento é obrigatório"
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
  email: Yup.string().required("O e-mail é obrigatório"),
  telefone: Yup.string().required("O telefone é obrigatório"),
  temParente: Yup.string(),
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
  religiao: Yup.string(),
});

const schemaMatricula = Yup.object().shape({
  escola: Yup.string().required("A escola é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
  turnoPastoral: Yup.string().required("O turno é obrigatório"),
});

const FormularioMatricula: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  let { id } = useParams() ?? {};

  const [novoAluno, setNovoAluno] = useState<boolean>(false);
  const [alunoSelecionado, setAlunoSelecionado] =
    useState<{ id: number; nome: string }>();

  const [pesquisa, setPesquisa] = useState("");

  const [alunos, setAlunos] = useState([]);

  const {
    control,
    register: register1,
    handleSubmit,
    watch,
    formState: { errors },
    setValue: setValue1,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   nome: "Teste",
    //   sexo: "masculino",
    //   cpf: "07800048548",
    //   dataNascimento: "07/01/2000",
    //   rg: "1062",
    //   dataExpedicao: "07/01/2000",
    //   endereco: "fkodsjmfiopds",
    //   naturalidade: "jmkcdsjmf",
    //   nacionalidade: "iopdjksofkds",
    //   termoCN: "jikofdjsio",
    //   folhaCN: "dfsjifko",
    //   livroCN: "fdsofk",
    //   email: "teste@gmail.com",
    //   telefone: "7799999999",
    //   temParente: true,
    //   nomeParente: "",
    //   nomeContatoUrgencia: "",
    //   telefoneContatoUrgencia: "7799999999",
    //   parentesco: "pai",
    //   nomeResponsavel: "fjindkosjf",
    //   cpfResponsavel: "07800048548",
    //   enderecoResponsavel: "jmfdkos",
    //   telefoneResponsavel: "564905060",
    //   ocupacaoProfissionalResponsavel: "ocupado",
    //   bolsaSocial: true,
    //   nis: "54050",
    //   rgResponsavel: "40515",
    //   rendaFamiliar: "100",
    //   religiao: false,
    //   escola: "jkfdspiok",
    //   turno: "matutino",
    //   serie: "kfidsjkfiod",
    // },
  });

  const {
    control: control2,
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(schemaMatricula),
  });

  useEffect(() => {
    if (id) {
      buscarInformacoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const buscarInformacoes = async () => {
    const alunoMatricula = await buscarInformacoesMatriculaAluno(id);

    setValue2("escola", alunoMatricula?.escola);
    setValue2("serie", alunoMatricula?.serie);
    setValue2("turno", alunoMatricula?.turno);

    setAlunoSelecionado(alunoMatricula.aluno);
  };

  const temParente = watch("temParente", false);
  const bolsaSocial = watch("bolsaSocial", false);
  const certidaoNova = watch("certidaoNova", false);

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
        certidao_numero: numeroCertidao,
        certidao_nascimento_termo: termoCN,
        certidao_nascimento_folha: folhaCN,
        certidao_nascimento_livro: livroCN,
        email,
        telefone: telefone.replace(/[^0-9]+/g, ""),
        tem_parente: temParente ?? false,
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
        permite_catequese: religiao ?? false,
      },
      matricula: {
        escola,
        turno,
        turno_pastoral: turnoPastoral,
        serie,
        data: new Date(),
        ano: new Date().getFullYear(),
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

  const onSubmitMatricula = async ({ escola, serie, turno }) => {
    if (!alunoSelecionado) {
      return toast({
        title: "Por favor, selecione um aluno",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
    }

    const resultado = await editarMatricula(id, {
      escola,
      turno,
      serie,
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

  if (id && !alunoSelecionado) {
    return <></>;
  }

  return (
    <>
      <Text as="h2" fontSize={24} fontWeight="bold" mb={4}>
        Matrícula
      </Text>
      <div>
        {!id && (
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
        )}
        {alunoSelecionado && (
          <IonItem>
            <IonLabel>Aluno: {alunoSelecionado?.nome}</IonLabel>
            {!id && (
              <IonButton
                slot="end"
                onClick={() => setAlunoSelecionado(undefined)}
              >
                Alterar aluno
              </IonButton>
            )}
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
        {novoAluno && (
          <>
            <Text fontWeight="bold" fontSize={20} marginY={6}>
              Dados do aluno
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.nome)}>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" {...register1("nome")} />
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
                          setValue1("sexo", e);
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
                      {...register1("cpf")}
                      onChange={(e) =>
                        setValue1("cpf", formatarCPF(e.target.value))
                      }
                    />
                    <FormErrorMessage>{errors?.cpf?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.dataNascimento)}>
                    <FormLabel>Data de nascimento</FormLabel>
                    <Input type="date" {...register1("dataNascimento")} />
                    <FormErrorMessage>
                      {errors?.dataNascimento?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.rg)}>
                    <FormLabel>RG</FormLabel>
                    <Input type="text" {...register1("rg")} />
                    <FormErrorMessage>{errors?.rg?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.dataExpedicao)}>
                    <FormLabel>Data de expedição</FormLabel>
                    <Input type="date" {...register1("dataExpedicao")} />
                    <FormErrorMessage>
                      {errors?.dataExpedicao?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <FormControl isInvalid={Boolean(errors.endereco)}>
                  <FormLabel>Endereço</FormLabel>
                  <Input type="text" {...register1("endereco")} />
                  <FormErrorMessage>
                    {errors?.endereco?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack direction="row">
                  <FormControl isInvalid={Boolean(errors.naturalidade)}>
                    <FormLabel>Naturalidade</FormLabel>
                    <Input type="text" {...register1("naturalidade")} />
                    <FormErrorMessage>
                      {errors?.naturalidade?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.nacionalidade)}>
                    <FormLabel>Nacionalidade</FormLabel>
                    <Input type="text" {...register1("nacionalidade")} />
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
                          onChange={(e) =>
                            setValue1("certidaoNova", e.target.checked)
                          }
                        >
                          Certidão nova
                        </Checkbox>
                      )}
                      name="certidaoNova"
                      control={control}
                    />
                    <FormErrorMessage>
                      {errors?.temcertidaoNovaParente?.message}
                    </FormErrorMessage>
                  </FormControl>

                  {certidaoNova ? (
                    <FormControl isInvalid={Boolean(errors.numeroCertidao)}>
                      <FormLabel>Número da certidão</FormLabel>
                      <Input type="text" {...register1("numeroCertidao")} />
                      <FormErrorMessage>
                        {errors?.numeroCertidao?.message}
                      </FormErrorMessage>
                    </FormControl>
                  ) : (
                    <Stack direction="row">
                      <FormControl isInvalid={Boolean(errors.termoCN)}>
                        <FormLabel>Termo</FormLabel>
                        <Input type="text" {...register1("termoCN")} />
                        <FormErrorMessage>
                          {errors?.termoCN?.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.folhaCN)}>
                        <FormLabel>Folha</FormLabel>
                        <Input type="text" {...register1("folhaCN")} />
                        <FormErrorMessage>
                          {errors?.folhaCN?.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.livroCN)}>
                        <FormLabel>Livro</FormLabel>
                        <Input type="text" {...register1("livroCN")} />
                        <FormErrorMessage>
                          {errors?.livroCN?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                  )}
                </Stack>

                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel>E-mail</FormLabel>
                  <Input type="email" {...register1("email")} />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.telefone)}>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    type="text"
                    {...register1("telefone")}
                    onChange={(e) =>
                      setValue1("telefone", formatarTelefone(e.target.value))
                    }
                  />
                  <FormErrorMessage>
                    {errors?.telefone?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={4}>
                  <FormControl isInvalid={Boolean(errors.temParente)}>
                    <Controller
                      render={({ field: { value } }) => (
                        <Checkbox
                          defaultChecked={value}
                          onChange={(e) =>
                            setValue1("temParente", e.target.checked)
                          }
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
                    <FormControl isInvalid={Boolean(errors.nomeParente)}>
                      <FormLabel>Especificar o nome do parente</FormLabel>
                      <Input type="text" {...register1("nomeParente")} />
                      <FormErrorMessage>
                        {errors?.nomeParente?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Stack>

                <Stack>
                  <FormLabel>Contato de urgência</FormLabel>

                  <Stack direction="row">
                    <FormControl
                      isInvalid={Boolean(errors.nomeContatoUrgencia)}
                    >
                      <FormLabel>Nome</FormLabel>
                      <Input
                        type="text"
                        {...register1("nomeContatoUrgencia")}
                      />
                      <FormErrorMessage>
                        {errors?.nomeContatoUrgencia?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={Boolean(errors.telefoneContatoUrgencia)}
                    >
                      <FormLabel>Celular</FormLabel>
                      <Input
                        type="text"
                        {...register1("telefoneContatoUrgencia")}
                        onChange={(e) =>
                          setValue1(
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
                  <Input type="afinidades" {...register1("afinidades")} />
                  <FormErrorMessage>
                    {errors?.afinidades?.message}
                  </FormErrorMessage>
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
                                setValue1("parentesco", e.target.value);
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
                      <Input type="text" {...register1("nomeResponsavel")} />
                      <FormErrorMessage>
                        {errors?.nomeResponsavel?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <Stack direction="row">
                      <FormControl isInvalid={Boolean(errors.cpfResponsavel)}>
                        <FormLabel>CPF</FormLabel>
                        <Input
                          type="text"
                          {...register1("cpfResponsavel")}
                          onChange={(e) =>
                            setValue1(
                              "cpfResponsavel",
                              formatarCPF(e.target.value)
                            )
                          }
                        />
                        <FormErrorMessage>
                          {errors?.cpfResponsavel?.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.rgResponsavel)}>
                        <FormLabel>RG</FormLabel>
                        <Input type="text" {...register1("rgResponsavel")} />
                        <FormErrorMessage>
                          {errors?.rgResponsavel?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>

                    <FormControl
                      isInvalid={Boolean(errors.enderecoResponsavel)}
                    >
                      <FormLabel>Endereço</FormLabel>
                      <Input
                        type="text"
                        {...register1("enderecoResponsavel")}
                      />
                      <FormErrorMessage>
                        {errors?.enderecoResponsavel?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={Boolean(errors.telefoneResponsavel)}
                    >
                      <FormLabel>Celular</FormLabel>
                      <Input
                        type="text"
                        {...register1("telefoneResponsavel")}
                        onChange={(e) =>
                          setValue1(
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
                          onChange={(e) =>
                            setValue1("bolsaSocial", e.target.checked)
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
                    <FormControl isInvalid={Boolean(errors.nis)}>
                      <FormLabel>NIS</FormLabel>
                      <Input type="text" {...register1("nis")} />
                      <FormErrorMessage>
                        {errors?.nis?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Stack>

                <FormControl
                  isInvalid={Boolean(errors.ocupacaoProfissionalResponsavel)}
                >
                  <FormLabel>Ocupação profissional</FormLabel>
                  <Input
                    type="text"
                    {...register1("ocupacaoProfissionalResponsavel")}
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
                        onChange={(e) =>
                          setValue1("religiao", e.target.checked)
                        }
                      >
                        Permite catequese
                      </Checkbox>
                    )}
                    name="religiao"
                    control={control}
                  />
                  <FormErrorMessage>
                    {errors?.religiao?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <Text fontWeight="bold" fontSize={20} marginY={6}>
                Dados da matrícula
              </Text>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.escola)}>
                  <FormLabel>Escola</FormLabel>
                  <Input type="text" {...register1("escola")} />
                  <FormErrorMessage>{errors?.escola?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.serie)}>
                  <FormLabel>Série</FormLabel>
                  <Input type="text" {...register1("serie")} />
                  <FormErrorMessage>{errors?.serie?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.turno)}>
                  <FormLabel>Turno na escola</FormLabel>
                  <Controller
                    render={({ field: { value } }) => (
                      <RadioGroup
                        defaultValue={value}
                        name="turno"
                        onChange={(e: any) => {
                          setValue1("turno", e);
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
                <FormControl isInvalid={Boolean(errors.turnoPastoral)}>
                  <FormLabel>Turno na pastoral</FormLabel>
                  <Controller
                    render={({ field: { value } }) => (
                      <RadioGroup
                        defaultValue={value}
                        name="turnoPastoral"
                        onChange={(e: any) => {
                          setValue1("turnoPastoral", e);
                        }}
                      >
                        <Stack direction="row">
                          <Radio value="matutino">Matutino</Radio>
                          <Radio value="vespertino">Vespertino</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    name="turnoPastoral"
                    control={control}
                  />
                  <FormErrorMessage>
                    {errors?.turnoPastoral?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IonButton type="submit">Salvar</IonButton>
              </div>
            </form>
          </>
        )}

        {!novoAluno && pesquisa.length === 0 && (
          <div>
            <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
              Dados da matrícula
            </IonTitle>
            <form onSubmit={handleSubmit2(onSubmitMatricula)}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors2?.escola)}>
                  <FormLabel>Escola</FormLabel>
                  <Input type="text" {...register2("escola")} />
                  <FormErrorMessage>
                    {errors2?.escola?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors2?.serie)}>
                  <FormLabel>Série</FormLabel>
                  <Input type="text" {...register2("serie")} />
                  <FormErrorMessage>{errors2?.serie?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors2?.turno)}>
                  <FormLabel>Turno na escola</FormLabel>
                  <Controller
                    render={({ field: { value } }) => {
                      return (
                        <RadioGroup
                          defaultValue={value}
                          name="turno"
                          onChange={(e: any) => {
                            setValue2("turno", e);
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
                    control={control2}
                  />
                  <FormErrorMessage>{errors2?.turno?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors2?.turno)}>
                  <FormLabel>Turno na pastoral</FormLabel>
                  <Controller
                    render={({ field: { value } }) => (
                      <RadioGroup
                        defaultValue={value}
                        name="turnoPastoral"
                        onChange={(e: any) => {
                          setValue2("turnoPastoral", e);
                        }}
                      >
                        <Stack direction="row">
                          <Radio value="matutino">Matutino</Radio>
                          <Radio value="vespertino">Vespertino</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    name="turnoPastoral"
                    control={control2}
                  />
                  <FormErrorMessage>
                    {errors2?.turnoPastoral?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IonButton type="submit">Salvar</IonButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default FormularioMatricula;
