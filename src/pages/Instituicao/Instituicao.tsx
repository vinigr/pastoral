import "./styles.css";

import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect } from "react";
import { formatarCNPJ, formatarTelefone } from "../../utils/formatarStrings";

import buscarInformacoesInstituicao from "../../usecases/buscarInformacoesInstituicao";
import salvarInformacoesInstituicao from "../../usecases/salvarInformacoesInstituicao";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  cnpj: Yup.string()
    .required("O CNPJ é obrigatório")
    .matches(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/,
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
  const [present] = useIonToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    buscarInformacoes();
  }, []);

  const buscarInformacoes = async () => {
    const instituicao = await buscarInformacoesInstituicao();

    console.log(instituicao);

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
      return present({
        message: "Informações salvas com sucesso!",
        color: "success",
        duration: 2000,
      });
    }

    return present({
      message: "Falha ao salvar informações! Por favor, tente novamente",
      color: "danger",
      duration: 2000,
    });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Instituicão</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle size="large">Instituicão</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem>
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
            <IonItem>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "cnpj",
                          value: formatarCNPJ(e?.detail?.value),
                        },
                      });
                    }}
                    placeholder="CNPJ"
                    onBlur={onBlur}
                    type="text"
                    clearInput
                    maxlength={18}
                  />
                )}
                name="cnpj"
                rules={{ required: true }}
              />
            </IonItem>
            <div className="mensagem-erro">{errors?.cnpj?.message}</div>
            <IonItem>
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
            <IonItem>
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
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IonInput
                    value={value}
                    onIonChange={(e) => {
                      onChange({
                        target: {
                          name: "telefone",
                          value: formatarTelefone(e?.detail?.value),
                        },
                      });
                    }}
                    placeholder="Telefone"
                    onBlur={onBlur}
                    type="text"
                    clearInput
                    maxlength={14}
                  />
                )}
                name="telefone"
                rules={{ required: true }}
              />
            </IonItem>
            <div className="mensagem-erro">{errors?.telefone?.message}</div>
            <IonButton type="submit">Salvar</IonButton>
          </form>
        </div>
      </IonContent>
    </>
  );
};

export default Instituicao;
