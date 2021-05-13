import "./styles.css";

import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import React from "react";
import fazerLogin from "../../usecases/fazerLogin";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  usuario: Yup.string().required("O usuário é necessário"),
  senha: Yup.string().required("A senha é necessária"),
});

const Login: React.FC = () => {
  const { push } = useIonRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    usuario,
    senha,
  }: {
    usuario: string;
    senha: string;
  }) => {
    const resultado = await fazerLogin(usuario, senha);

    if (resultado) {
      push("/alunos");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard className="card">
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Login</IonCardTitle>
            </IonCardHeader>
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
                            name: "usuario",
                            value: e?.detail?.value,
                          },
                          type: "text",
                        });
                      }}
                      placeholder="Usuário"
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="usuario"
                  rules={{ required: true }}
                />
              </IonItem>
              <div className="mensagem-erro">{errors?.usuario?.message}</div>
              <IonItem>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonInput
                      value={value}
                      onIonChange={(e) => {
                        onChange({
                          target: {
                            name: "senha",
                            value: e?.detail?.value,
                          },
                          type: "password",
                        });
                      }}
                      placeholder="Senha"
                      onBlur={onBlur}
                      clearInput
                    />
                  )}
                  name="senha"
                  rules={{ required: true }}
                />
              </IonItem>
              <div className="mensagem-erro">{errors?.senha?.message}</div>
              <IonButton expand="full" type="submit">
                Entrar
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
