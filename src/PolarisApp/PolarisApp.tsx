/* eslint-disable @typescript-eslint/no-empty-function */
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  GlobalContextInterface,
  lagrangeSolveReturns,
} from "./interfaces";
import { createContext, useState } from "react";
import { modes, pages } from "./enums";

import AboutUsPage from "./pages/AboutUsPage";
import LagrangePage from "./pages/LagrangePage";
import NewtonPage from "./pages/NewtonPage";
import SideBar from "./components/SideBar";

export const GlobalState = createContext<GlobalContextInterface>({
  page: pages.NEWTON,
  setPage: () => {},
  xVars: [],
  setXVars: () => {},
  yVars: [],
  setYVars: () => {},
  n: 0,
  setN: () => {},
  pVars: [],
  setPVars: () => {},
  p: 0,
  setP: () => {},
  mode: modes.USER_DEFINED,
  setMode: () => {},
  lagrangeSolveReturns: null,
  setLagrangeSolveReturns: () => {},
});

function PolarisApp() {
  const [page, setPage] = useState<pages>(pages.LAGRANGE); // the page that the user is currently on
  const [xVars, setXVars] = useState<string[]>(["0", "0"]); // the values of x that the user wants
  const [yVars, setYVars] = useState<string[]>(["0", "0"]); // the values of y that the user wants
  const [pVars, setPVars] = useState<string[]>(["0"]); // the values of P(x) that the user wants
  const [mode, setMode] = useState<modes>(modes.USER_DEFINED); // if the user wants to use the default values or not
  const [n, setN] = useState<number>(2); // amount of points
  const [p, setP] = useState<number>(1); // amount of P(x)
  const [lagrangeSolveReturns, setLagrangeSolveReturns] =
    useState<lagrangeSolveReturns | null>(null); // the values of P(x) that the user wants

  return (
    <GlobalState.Provider
      value={{
        page,
        setPage,
        xVars,
        setXVars,
        yVars,
        setYVars,
        n,
        setN,
        pVars,
        setPVars,
        p: p,
        setP,
        mode,
        setMode,
        lagrangeSolveReturns,
        setLagrangeSolveReturns,
      }}
    >
      <div className="App row text-center">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          {page === pages.LAGRANGE && <LagrangePage />}
          {page === pages.NEWTON && <NewtonPage />}
          {page === pages.ABOUT_US && <AboutUsPage />}
        </div>
      </div>
    </GlobalState.Provider>
  );
}

export default PolarisApp;
