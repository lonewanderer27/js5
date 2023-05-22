/* eslint-disable @typescript-eslint/no-empty-function */
import "./App.css";

import { AboutHeader, BodyHeader }from "./Headers";
import { AnswerType, GlobalStateType } from "./types";
import { ChakraProvider, SlideFade, extendTheme } from "@chakra-ui/react";

import About from "./About";
import Body from "./Body";
import { Modes } from "./enums";
import Sidebar from "./Sidebar";
import { createContext } from "react";
import { useState } from "react";

const theme = extendTheme({
  fonts: {
    primary: "JetBrains Mono",
    secondary: "Inter, sans-serif",
  },
  colors: {
    c_primary: "#1b4c79",
    c_secondary: "#cdcdf4",
    c_background: "#ffffff",
    c_text: "#030c08",
    c_accent: "#080926",
    c_header: "#EAEAF4",
    c_input_label_box: "#B6B6CF",
    c_input_box: "#EAEAF4",
    c_solution_1: "#B6B6CF",
    c_solution_2: "#C7DDF0",
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontFamily: "primary",
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "primary",
      },
    },
    Input: {
      parts: ["addon"],
      baseStyle: {
        addon: {
          fontFamily: "secondary",
          fontWeight: "bold",
          fontStyle: "italic",
          bg: "primary",
        },
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "secondary",
        fontWeight: "semibold"
      }
    }
  },
});

export const GlobalState = createContext<GlobalStateType>({
  mode: Modes.PREDEFINED,
  setMode: () => {},
  showAnswer: false,
  setShowAnswer: () => {},
  function_: "ln(x+1)",
  setFunction_: () => {},
  a: 0,
  setA: () => {},
  b: 0,
  setB: () => {},
  n: 0,
  setN: () => {},
  answer: null,
  setAnswer: () => {}
})

function MantarieApp() {
  const [mode, setMode] = useState<Modes | null>(Modes.PREDEFINED)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [function_, setFunction_] = useState<string>("")
  const [a, setA] = useState<number>(0)
  const [b, setB] = useState<number>(0)
  const [n, setN] = useState<number>(2)
  const [answer, setAnswer] = useState<AnswerType | null>(null)

  console.log("state")
  console.log("mode: ", mode)
  console.log("showAnswer: ", showAnswer)
  console.log("function_: ", function_)
  console.log("a: ", a)
  console.log("b: ", b)
  console.log("n: ", n)

  return (
    <ChakraProvider theme={theme}>
      <GlobalState.Provider
        value={{
          mode,
          setMode,
          showAnswer,
          setShowAnswer,
          function_,
          setFunction_,
          a,
          setA,
          b,
          setB,
          n,
          setN,
          answer,
          setAnswer
        }}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 lg:h-screen ">
            <Sidebar />
          </div>
          <div className="w-full lg:w-3/4 lg:max-h-screen lg:overflow-y-auto">
            {mode != null && <SlideFade in={mode != null}>  
              <BodyHeader mode={mode} />
              <Body />
            </SlideFade>}
            {mode == null && <SlideFade in={mode == null}>
              <AboutHeader />
              <About />
            </SlideFade>}
          </div>
        </div>
      </GlobalState.Provider>
      
    </ChakraProvider>
  );
}

export default MantarieApp;
