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

import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login/Login";
import Menu from "./components/Menu";
import Page from "./pages/Page";

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
            <Route path="/page/:id" exact={true}>
              <Page />
            </Route>
          </IonSplitPane>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
