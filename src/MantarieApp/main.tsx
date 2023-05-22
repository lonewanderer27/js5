import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import MantarieApp from "./MantarieApp.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MantarieApp />
    </ChakraProvider>
  </React.StrictMode>
);
