import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect } from "react";
import {
  formatarCelular,
  formatarCpf,
  formatarDinheiro,
  formatarTelefone,
} from "../../utils/formatarStrings";

import buscarInformacoesAluno from "../../usecases/buscarInformacoesAluno";
import editarAluno from "../../usecases/editarAluno";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

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
  religiao: Yup.string().required("A religião é obrigatória"),
});

const FormAluno: React.FC = () => {
  const [present] = useIonToast();
  let { id } = useParams<{ id?: string }>() ?? {};

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      buscarInformacoes();
    }
  }, [id]);

  const buscarInformacoes = async () => {
    const alunoMatricula = await buscarInformacoesAluno(id);

    setValue("nome", alunoMatricula?.nome);
    setValue("sexo", alunoMatricula?.sexo);
    setValue("cpf", alunoMatricula?.cpf);
    setValue("dataNascimento", alunoMatricula?.dataNascimento);
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
        return present({
          message: "Matrícula salva com sucesso!",
          color: "success",
          duration: 2000,
        });
      }
      return present({
        message: "Falha ao salvar matrícula! Por favor, tente novamente",
        color: "danger",
        duration: 2000,
      });
    }
  };

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Aluno</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div>
        <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
          Dados do aluno
        </IonTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "nome",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  placeholder="Nome"
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="nome"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.nome?.message}</div>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <IonRadioGroup
                value={value}
                onIonChange={(e) => {
                  onChange({
                    target: {
                      name: "sexo",
                      value: e?.detail?.value,
                    },
                    type: "text",
                  });
                }}
                onBlur={onBlur}
              >
                <IonListHeader>
                  <IonLabel>Sexo</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonLabel>Masculino</IonLabel>
                  <IonRadio value="masculino" />
                </IonItem>
                <IonItem>
                  <IonLabel>Feminino</IonLabel>
                  <IonRadio value="feminino" />
                </IonItem>
              </IonRadioGroup>
            )}
            name="sexo"
            rules={{ required: true }}
          />

          <div className="mensagem-erro">{errors?.sexo?.message}</div>

          <IonRow>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">CPF</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "cpf",
                          value: formatarCpf(e?.detail?.value || ""),
                        },
                      });
                    }}
                    onBlur={onBlur}
                    type="text"
                    clearInput
                    maxlength={14}
                  />
                )}
                name="cpf"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">Data de nascimento</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "dataNascimento",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="dataNascimento"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">RG</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "rg",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="rg"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Data de expedição</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "dataExpedicao",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    placeholder=""
                    type="date"
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="dataExpedicaog"
                rules={{ required: true }}
              />
            </IonItem>
          </IonRow>

          <div className="mensagem-erro">{errors?.cpf?.message}</div>
          <div className="mensagem-erro">{errors?.dataNascimento?.message}</div>
          <div className="mensagem-erro">{errors?.rg?.message}</div>
          <div className="mensagem-erro">{errors?.dataExpedicao?.message}</div>
          <IonItem>
            <IonLabel position="floating">Endereço</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "endereco",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  placeholder="Endereço"
                  onBlur={onBlur}
                  type="text"
                  clearInput
                />
              )}
              name="endereco"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.endereco?.message}</div>
          <IonRow>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">Naturalidade</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "naturalidade",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="naturalidade"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nacionalidade</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "nacionalidade",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="nacionalidade"
                rules={{ required: true }}
              />
            </IonItem>
          </IonRow>
          <div className="mensagem-erro">{errors?.naturalidade?.message}</div>
          <div className="mensagem-erro">{errors?.nacionalidade?.message}</div>

          <IonItemGroup>
            <IonRow className="ion-align-items-center">
              <IonItemDivider>
                <IonLabel> Certidão de nascimento</IonLabel>
              </IonItemDivider>

              <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                <IonLabel position="floating">Termo</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "termoCN",
                            value: e?.detail?.value,
                          },
                        });
                      }}
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="termoCN"
                  rules={{ required: true }}
                />
              </IonItem>
              <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                <IonLabel position="floating">Folha</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "folhaCN",
                            value: e?.detail?.value,
                          },
                        });
                      }}
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="folhaCN"
                  rules={{ required: true }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Livro</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "livroCN",
                            value: e?.detail?.value,
                          },
                        });
                      }}
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="livroCN"
                  rules={{ required: true }}
                />
              </IonItem>
            </IonRow>
          </IonItemGroup>

          <div className="mensagem-erro">{errors?.termoCN?.message}</div>
          <div className="mensagem-erro">{errors?.folhaCN?.message}</div>
          <div className="mensagem-erro">{errors?.livroCN?.message}</div>
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "email",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  placeholder="E-mail"
                  onBlur={onBlur}
                  type="email"
                  clearInput
                />
              )}
              name="email"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.email?.message}</div>
          <IonItem>
            <IonLabel position="floating">Telefone</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "telefone",
                        value:
                          e?.detail?.value?.length === 15
                            ? formatarCelular(e?.detail?.value)
                            : formatarTelefone(e?.detail?.value || ""),
                      },
                    });
                  }}
                  placeholder="Telefone"
                  onBlur={onBlur}
                  type="text"
                  clearInput
                  maxlength={15}
                />
              )}
              name="telefone"
              rules={{ required: true }}
            />
          </IonItem>

          <div className="mensagem-erro">{errors?.telefone?.message}</div>

          <IonItemGroup>
            <IonRow className="ion-align-items-center">
              <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                <IonLabel position="floating">Tem parente na pastoral</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonCheckbox
                      checked={value ? true : false}
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "temParente",
                            value: e?.detail?.checked,
                          },
                        });
                      }}
                      onBlur={onBlur}
                    />
                  )}
                  name="temParente"
                  rules={{ required: true }}
                />
              </IonItem>

              {temParente && (
                <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                  <IonLabel position="floating">Especificar o nome</IonLabel>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonInput
                        value={value}
                        onIonChange={(e) => {
                          onChange({
                            target: {
                              name: "nomeParente",
                              value: e?.detail?.value,
                            },
                          });
                        }}
                        onBlur={onBlur}
                        clearInput
                      />
                    )}
                    name="nomeParente"
                    rules={{ required: true }}
                  />
                </IonItem>
              )}
            </IonRow>
          </IonItemGroup>

          <div className="mensagem-erro">{errors?.temParente?.message}</div>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Contato de urgência</IonLabel>
            </IonItemDivider>
            <IonRow className="ion-align-items-center">
              <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                <IonLabel position="floating">Nome</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "nomeContatoUrgencia",
                            value: e?.detail?.value,
                          },
                        });
                      }}
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="nomeContatoUrgencia"
                  rules={{ required: true }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Celular</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "telefoneContatoUrgencia",
                            value:
                              e?.detail?.value?.length === 15
                                ? formatarCelular(e?.detail?.value)
                                : formatarTelefone(e?.detail?.value || ""),
                          },
                        });
                      }}
                      onBlur={onBlur}
                      clearInput
                      maxlength={15}
                    />
                  )}
                  name="telefoneContatoUrgencia"
                  rules={{ required: true }}
                />
              </IonItem>
            </IonRow>
          </IonItemGroup>

          <div className="mensagem-erro">
            {errors?.nomeContatoUrgencia?.message}
          </div>

          <div className="mensagem-erro">
            {errors?.telefoneContatoUrgencia?.message}
          </div>

          <IonTitle
            style={{ marginTop: 10, marginBottom: 10, paddingInline: 0 }}
          >
            Dados do responsável
          </IonTitle>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <IonRadioGroup
                value={value}
                onIonChange={(e) => {
                  onChange({
                    target: {
                      name: "parentesco",
                      value: e?.detail?.value,
                    },
                    type: "text",
                  });
                }}
                onBlur={onBlur}
              >
                <IonListHeader>
                  <IonLabel>Responsável pelo aluno</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonLabel>Pai</IonLabel>
                  <IonRadio value="pai" />
                </IonItem>
                <IonItem>
                  <IonLabel>Mãe</IonLabel>
                  <IonRadio value="mae" />
                </IonItem>
                <IonItem>
                  <IonLabel>Avô/Avó</IonLabel>
                  <IonRadio value="avo" />
                </IonItem>
                <IonItem>
                  <IonLabel>Outros</IonLabel>
                  <IonRadio value="outros" />
                </IonItem>
              </IonRadioGroup>
            )}
            name="parentesco"
            rules={{ required: true }}
          />

          <div className="mensagem-erro">{errors?.parentesco?.message}</div>

          <IonItem style={{ marginTop: 10 }}>
            <IonLabel position="floating">Nome</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "nomeResponsavel",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  placeholder="Nome"
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="nomeResponsavel"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">
            {errors?.nomeResponsavel?.message}
          </div>

          <IonRow>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">CPF</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "cpfResponsavel",
                          value: formatarCpf(e?.detail?.value || ""),
                        },
                      });
                    }}
                    placeholder="CPF"
                    onBlur={onBlur}
                    type="text"
                    clearInput
                    maxlength={14}
                  />
                )}
                name="cpfResponsavel"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">RG</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "rgResponsavel",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="rgResponsavel"
                rules={{ required: true }}
              />
            </IonItem>
          </IonRow>

          {errors?.cpfResponsavel?.message && (
            <div className="mensagem-erro">
              {errors?.cpfResponsavel?.message}
            </div>
          )}
          <div className="mensagem-erro">{errors?.rgResponsavel?.message}</div>
          <IonItem>
            <IonLabel position="floating">Endereço</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "enderecoResponsavel",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  placeholder="Endereço"
                  onBlur={onBlur}
                  type="text"
                  clearInput
                />
              )}
              name="enderecoResponsavel"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">
            {errors?.enderecoResponsavel?.message}
          </div>

          <IonItem>
            <IonLabel position="floating">Telefone</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "telefoneResponsavel",
                        value:
                          e?.detail?.value?.length === 15
                            ? formatarCelular(e?.detail?.value)
                            : formatarTelefone(e?.detail?.value || ""),
                      },
                    });
                  }}
                  placeholder="Telefone"
                  onBlur={onBlur}
                  type="text"
                  clearInput
                  maxlength={15}
                />
              )}
              name="telefoneResponsavel"
              rules={{ required: true }}
            />
          </IonItem>

          <div className="mensagem-erro">
            {errors?.telefoneResponsavel?.message}
          </div>

          <IonItemGroup>
            <IonRow className="ion-align-items-center">
              <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                <IonLabel position="floating">Possui bolsa social</IonLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonCheckbox
                      checked={value ? true : false}
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "bolsaSocial",
                            value: e?.detail?.checked,
                          },
                        });
                      }}
                      onBlur={onBlur}
                    />
                  )}
                  name="bolsaSocial"
                  rules={{ required: true }}
                />
              </IonItem>

              {bolsaSocial && (
                <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
                  <IonLabel position="floating">NIS</IonLabel>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonInput
                        value={value}
                        onIonChange={(e) => {
                          onChange({
                            target: {
                              name: "nis",
                              value: e?.detail?.value?.replace(/\D/g, ""),
                            },
                          });
                        }}
                        onBlur={onBlur}
                        clearInput
                      />
                    )}
                    name="nis"
                    rules={{ required: true }}
                  />
                </IonItem>
              )}
            </IonRow>
          </IonItemGroup>
          <div className="mensagem-erro">{errors?.temParente?.message}</div>

          <IonItem>
            <IonLabel position="floating">Ocupação profissional</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "ocupacaoProfissionalResponsavel",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  onBlur={onBlur}
                  type="text"
                  clearInput
                  maxlength={15}
                />
              )}
              name="ocupacaoProfissionalResponsavel"
              rules={{ required: true }}
            />
          </IonItem>

          <div className="mensagem-erro">
            {errors?.ocupacaoProfissionalResponsavel?.message}
          </div>

          <IonRow>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">Renda familiar</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "rendaFamiliar",
                          value: formatarDinheiro(e?.detail?.value || ""),
                        },
                      });
                    }}
                    onBlur={onBlur}
                    type="text"
                    clearInput
                  />
                )}
                name="rendaFamiliar"
                rules={{ required: true }}
              />
            </IonItem>
            <IonItem style={{ marginRight: 10, marginBottom: 4 }}>
              <IonLabel position="floating">Religião</IonLabel>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "religiao",
                          value: e?.detail?.value,
                        },
                      });
                    }}
                    onBlur={onBlur}
                    clearInput
                  />
                )}
                name="religiao"
                rules={{ required: true }}
              />
            </IonItem>
          </IonRow>

          <div className="mensagem-erro">{errors?.rendaFamiliar?.message}</div>

          {errors?.religiao?.message && (
            <div className="mensagem-erro">{errors?.religiao?.message}</div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IonButton type="submit">Salvar</IonButton>
          </div>
        </form>
      </div>
    </IonContent>
  );
};

export default FormAluno;
