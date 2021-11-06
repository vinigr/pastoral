import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { formatarDinheiro } from "../../utils/formatarStrings";
import { useNavigate, useParams } from "react-router-dom";

import buscarInformacoesMatriculaAluno from "../../usecases/buscarInformacoesMatriculaAluno";
import cadastrarMatriculaEAluno from "../../usecases/cadastrarMatriculaEAluno";
import editarMatriculaEAluno from "../../usecases/editarMatriculaEAluno";
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
} from "@chakra-ui/react";

import InputMask from "react-input-mask";

const schema = Yup.object().shape({
  escola: Yup.string().required("A escola é obrigatória"),
  sexo: Yup.string().required("A escolha do sexo é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
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
    "O telefone do contato de urgência é obrigatório"
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
  religiao: Yup.string().required("A religião é obrigatória"),
});

const schemaMatricula = Yup.object().shape({
  escola: Yup.string().required("A escola é obrigatória"),
  serie: Yup.string().required("A série é obrigatória"),
  turno: Yup.string().required("O turno é obrigatório"),
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

    setAlunoSelecionado(alunoMatricula.aluno);

    setValue2("escola", alunoMatricula?.matricula?.escola);
    setValue2("serie", alunoMatricula?.matricula?.serie);
    setValue2("turno", alunoMatricula?.matricula?.turno);
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
    escola,
    turno,
    serie,
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
      matricula: {
        escola,
        turno,
        serie,
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

    const resultado = await editarMatriculaEAluno(id, {
      matricula: {
        escola,
        turno,
        serie,
      },
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
            <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
              Dados da matrícula
            </IonTitle>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.escola}>
                <FormLabel>Escola</FormLabel>
                <Input type="text" {...register1("escola")} />
                <FormErrorMessage>{errors?.escola?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.serie}>
                <FormLabel>Série</FormLabel>
                <Input type="text" {...register1("serie")} />
                <FormErrorMessage>{errors?.serie?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.turno}>
                <FormLabel>Turno</FormLabel>
                <Controller
                  render={() => (
                    <RadioGroup name="turno">
                      <Stack
                        direction="row"
                        onChange={(e: any) => {
                          setValue1("turno", e.target.value);
                        }}
                      >
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
            </Stack>

            <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
              Dados do aluno
            </IonTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.nome}>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" {...register1("nome")} />
                  <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.sexo}>
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
                  <FormControl isInvalid={errors.cpf}>
                    <FormLabel>CPF</FormLabel>
                    <Input
                      type="text"
                      {...register1("cpf")}
                      as={InputMask}
                      mask="999.999.999-99"
                      maskChar={null}
                    />
                    <FormErrorMessage>{errors?.cpf?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.dataNascimento}>
                    <FormLabel>Data de nascimento</FormLabel>
                    <Input type="date" {...register1("dataNascimento")} />
                    <FormErrorMessage>
                      {errors?.dataNascimento?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.rg}>
                    <FormLabel>RG</FormLabel>
                    <Input type="text" {...register1("rg")} />
                    <FormErrorMessage>{errors?.rg?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.dataExpedicao}>
                    <FormLabel>Data de expedição</FormLabel>
                    <Input type="date" {...register1("dataExpedicao")} />
                    <FormErrorMessage>
                      {errors?.dataExpedicao?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <FormControl isInvalid={errors.endereco}>
                  <FormLabel>Endereço</FormLabel>
                  <Input type="text" {...register1("endereco")} />
                  <FormErrorMessage>
                    {errors?.endereco?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack direction="row">
                  <FormControl isInvalid={errors.naturalidade}>
                    <FormLabel>Naturalidade</FormLabel>
                    <Input type="text" {...register1("naturalidade")} />
                    <FormErrorMessage>
                      {errors?.naturalidade?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.nacionalidade}>
                    <FormLabel>Nacionalidade</FormLabel>
                    <Input type="text" {...register1("nacionalidade")} />
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
                      <Input type="text" {...register1("termoCN")} />
                      <FormErrorMessage>
                        {errors?.termoCN?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.folhaCN}>
                      <FormLabel>Folha</FormLabel>
                      <Input type="text" {...register1("folhaCN")} />
                      <FormErrorMessage>
                        {errors?.folhaCN?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.livroCN}>
                      <FormLabel>Livro</FormLabel>
                      <Input type="text" {...register1("livroCN")} />
                      <FormErrorMessage>
                        {errors?.livroCN?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </Stack>

                <FormControl isInvalid={errors.email}>
                  <FormLabel>E-mail</FormLabel>
                  <Input type="email" {...register1("email")} />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.telefone}>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    type="text"
                    {...register1("telefone")}
                    as={InputMask}
                    mask="(99) 9999-9999"
                  />
                  <FormErrorMessage>
                    {errors?.telefone?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={4}>
                  <FormControl isInvalid={errors.temParente}>
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
                    <FormControl isInvalid={errors.nomeParente}>
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
                    <FormControl isInvalid={errors.nomeContatoUrgencia}>
                      <FormLabel>Nome</FormLabel>
                      <Input
                        type="text"
                        {...register1("nomeContatoUrgencia")}
                      />
                      <FormErrorMessage>
                        {errors?.nomeContatoUrgencia?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.telefoneContatoUrgencia}>
                      <FormLabel>Celular</FormLabel>
                      <Input
                        type="text"
                        {...register1("telefoneContatoUrgencia")}
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

                    <FormControl isInvalid={errors.nomeResponsavel}>
                      <FormLabel>Nome</FormLabel>
                      <Input type="text" {...register1("nomeResponsavel")} />
                      <FormErrorMessage>
                        {errors?.nomeResponsavel?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <Stack direction="row">
                      <FormControl isInvalid={errors.cpfResponsavel}>
                        <FormLabel>CPF</FormLabel>
                        <Input
                          type="text"
                          {...register1("cpfResponsavel")}
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
                        <Input type="text" {...register1("rgResponsavel")} />
                        <FormErrorMessage>
                          {errors?.rgResponsavel?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>

                    <FormControl isInvalid={errors.enderecoResponsavel}>
                      <FormLabel>Endereço</FormLabel>
                      <Input
                        type="text"
                        {...register1("enderecoResponsavel")}
                      />
                      <FormErrorMessage>
                        {errors?.enderecoResponsavel?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.telefoneResponsavel}>
                      <FormLabel>Celular</FormLabel>
                      <Input
                        type="text"
                        {...register1("telefoneResponsavel")}
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
                    <FormControl isInvalid={errors.nis}>
                      <FormLabel>NIS</FormLabel>
                      <Input type="text" {...register1("nis")} />
                      <FormErrorMessage>
                        {errors?.nis?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Stack>

                <FormControl isInvalid={errors.ocupacaoProfissionalResponsavel}>
                  <FormLabel>Ocupação profissional</FormLabel>
                  <Input
                    type="text"
                    {...register1("ocupacaoProfissionalResponsavel")}
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
                <FormControl isInvalid={errors2?.escola}>
                  <FormLabel>Escola</FormLabel>
                  <Input type="text" {...register2("escola")} />
                  <FormErrorMessage>
                    {errors2?.escola?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors2?.serie}>
                  <FormLabel>Série</FormLabel>
                  <Input type="text" {...register2("serie")} />
                  <FormErrorMessage>{errors2?.serie?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors2?.turno}>
                  <FormLabel>Turno</FormLabel>
                  <Controller
                    render={() => (
                      <RadioGroup name="turno">
                        <Stack
                          direction="row"
                          onChange={(e: any) => {
                            setValue2("turno", e.target.value);
                          }}
                        >
                          <Radio value="matutino">Matutino</Radio>
                          <Radio value="vespertino">Vespertino</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    name="turno"
                    control={control2}
                  />
                  <FormErrorMessage>{errors2?.turno?.message}</FormErrorMessage>
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
