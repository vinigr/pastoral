/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";

import { IonApp, IonPage, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";

import Alunos from "./pages/Alunos/Alunos";
import FormularioMatricula from "./pages/FormularioMatricula/FormularioMatricula";
import Instituicao from "./pages/Instituicao/Instituicao";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login/Login";
import Menu from "./components/Menu/Menu";
import Oficina from "./pages/Oficina/Oficina";
import Oficinas from "./pages/Oficinas/Oficinas";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <Redirect to="login" />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <IonSplitPane contentId="main">
            <Menu />
            <IonPage id="main">
              <Switch>
                <Route path="/alunos" exact={true}>
                  <Alunos />
                </Route>
                <Route path="/matricula" exact={true}>
                  <FormularioMatricula />
                </Route>
                <Route path="/matricula/:id">
                  <FormularioMatricula />
                </Route>
                <Route path="/oficinas" exact={true}>
                  <Oficinas />
                </Route>
                <Route path="/oficina" exact={true}>
                  <Oficina />
                </Route>
                <Route path="/oficina/:id">
                  <Oficina />
                </Route>
                <Route path="/instituicao" exact={true}>
                  <Instituicao />
                </Route>
              </Switch>
            </IonPage>
          </IonSplitPane>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
