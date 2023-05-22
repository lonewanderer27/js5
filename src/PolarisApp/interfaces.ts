import { modes, pages } from "./enums";

import React from "react";

export interface GlobalContextInterface {
  n: number;
  setN: React.Dispatch<React.SetStateAction<number>>;
  xVars: string[];
  setXVars: React.Dispatch<React.SetStateAction<string[]>>;
  yVars: string[];
  setYVars: React.Dispatch<React.SetStateAction<string[]>>;
  pVars: string[];
  setPVars: React.Dispatch<React.SetStateAction<string[]>>;
  p: number;
  setP : React.Dispatch<React.SetStateAction<number>>;
  page: pages;
  setPage: React.Dispatch<React.SetStateAction<pages>>;
  mode: modes;
  setMode: React.Dispatch<React.SetStateAction<modes>>;
  lagrangeSolveReturns: lagrangeSolveReturns | null;
  setLagrangeSolveReturns: React.Dispatch<React.SetStateAction<lagrangeSolveReturns | null>>;
}

export interface PxAnsInterface {
  [key: string]: bigint
}

export interface lagrangeSolveReturns {
  wholeFormula: string;
  s_string: string;
  s_tex: string;
  s_html: string | TrustedHTML;
  pxAnswers: PxAnsInterface[];
};

export interface lagrangeVerifyReturns {
  success: boolean,
  reasons: lagrangeVerifyReasons
}

export interface lagrangeVerifyReasons {
  n: string[],
  x: string[],
  y: string[],
  p: string[],
  pVars: string[]
}