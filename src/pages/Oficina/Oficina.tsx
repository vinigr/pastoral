import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect } from "react";

import buscarOficina from "../../usecases/buscarOficina";
import cadastrarOficina from "../../usecases/cadastrarOficina";
import editarOficina from "../../usecases/editarOficina";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  professor: Yup.string().required("O professor é obrigatório"),
  horario: Yup.string().required("O horário é obrigatório"),
  nivel: Yup.string().required("O nível da oficina é obrigatório"),
});

const Oficina: React.FC = () => {
  const [present] = useIonToast();
  let { id } = useParams<{ id?: string }>() ?? {};

  const {
    control,
    handleSubmit,
    setValue,
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
    const oficina = await buscarOficina(id);

    if (oficina) {
      setValue("nome", oficina?.nome);
      setValue("professor", oficina.professor);
      setValue("horario", oficina.horario);
      setValue("nivel", oficina?.nivel);
    }
  };

  const onSubmit = async ({
    nome,
    professor,
    horario,
    nivel,
  }: {
    nome: string;
    professor: string;
    horario: string;
    nivel: string;
  }) => {
    const dados = {
      nome,
      professor,
      horario,
      nivel,
    };

    if (id) {
      const resultado = await editarOficina(id, dados);

      if (resultado) {
        return present({
          message: "Oficina salva com sucesso!",
          color: "success",
          duration: 2000,
        });
      }
      return present({
        message: "Falha ao salvar oficina! Por favor, tente novamente",
        color: "danger",
        duration: 2000,
      });
    } else {
      const resultado = await cadastrarOficina(dados);

      if (resultado) {
        return present({
          message: "Oficina cadastrada com sucesso!",
          color: "success",
          duration: 2000,
        });
      }

      return present({
        message: "Falha ao cadastrar oficina! Por favor, tente novamente",
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
          <IonTitle>Oficina</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div>
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

          <IonItem>
            <IonLabel position="floating">Professor</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "professor",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="professor"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.professor?.message}</div>

          <IonItem>
            <IonLabel position="floating">Horário</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "horario",
                        value: e?.detail?.value,
                      },
                    });
                  }}
                  placeholder=""
                  type="time"
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="horario"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.horario?.message}</div>

          <IonItem>
            <IonLabel position="floating">Nível</IonLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  value={value}
                  onIonChange={(e) => {
                    onChange({
                      target: {
                        name: "nivel",
                        value: e?.detail?.value,
                      },
                      type: "text",
                    });
                  }}
                  onBlur={onBlur}
                  clearInput
                />
              )}
              name="nivel"
              rules={{ required: true }}
            />
          </IonItem>
          <div className="mensagem-erro">{errors?.nivel?.message}</div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IonButton type="submit">Salvar</IonButton>
          </div>
        </form>
      </div>
    </IonContent>
  );
};

export default Oficina;
