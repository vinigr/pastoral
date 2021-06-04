import "./Menu.css";

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import {
  businessOutline,
  businessSharp,
  fileTrayOutline,
  fileTraySharp,
  libraryOutline,
  librarySharp,
  personOutline,
  personSharp,
} from "ionicons/icons";

import { useLocation } from "react-router-dom";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Matrículas",
    url: "/matriculas",
    iosIcon: fileTrayOutline,
    mdIcon: fileTraySharp,
  },
  {
    title: "Alunos",
    url: "/alunos",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
  {
    title: "Oficinas",
    url: "/oficinas",
    iosIcon: libraryOutline,
    mdIcon: librarySharp,
  },
  {
    title: "Instituição",
    url: "/instituicao",
    iosIcon: businessOutline,
    mdIcon: businessSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
