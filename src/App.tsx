/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
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

import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes";
import { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("logado");
  }, []);

  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
