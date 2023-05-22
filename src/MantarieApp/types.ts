import { Modes } from "./enums";
import { functionTypeEnums } from "./enums"
import React from 'react';

export interface TableRow {
  i: number,
  xi: number,
  f_xi: number,
  ti: number,
  si: number
}

export interface AnswerType {
  deltaX: number,
  iterations: TableRow[],
  ans_si: number,
  ans_ti: number,
  sum_si: number,
  sum_ti: number
}

export interface GlobalStateType {
  mode: Modes | null,
  setMode: React.Dispatch<React.SetStateAction<Modes | null>>,
  showAnswer: boolean,
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  function_: string,
  setFunction_: React.Dispatch<React.SetStateAction<string>>,
  a: number,
  setA: React.Dispatch<React.SetStateAction<number>>,
  b: number,
  setB: React.Dispatch<React.SetStateAction<number>>,
  answer: AnswerType | null,
  setAnswer: React.Dispatch<React.SetStateAction<AnswerType | null>>,
  n: number,
  setN: React.Dispatch<React.SetStateAction<number>>
}

export type bisectionTableData = {
  funcType: functionTypeEnums,
  standardMethod: boolean,
  customFunc: string,
}

export type bisectionTableRows = {
  a: string,
  b: string,
  n: number,
  error: string
}[]

export type bisectionData = {
  a: string,
  b: string,
  funcType: functionTypeEnums,
  standardMethod: boolean,
  customFunc: string,
  iterations: number,
  error: string
}

export type testBisectionIntervalResults = {
  f_a: number,
  f_a_sign: number | null,
  f_b: number,
  f_b_sign: number | null, 
  errorMessages: string[],
  success: boolean
}

export type bisectionDataError = {
  a: string,
  b: string,
  func: string[],
  iterations: string;
  error: string;
}

export type bisectionDataError2 = {
  func: string,
}

export type bisectionTableDataError = {
  a: string,
  b: string,
  n: string,
  func: string,
  error: string
}[]

export type newtonTableData = {
  funcType: functionTypeEnums,
  customFunc: string,
  rows: {
    n: number,
    xn: string,
    error: number
  }[]
}

export type newtonData = {
  xn: string,
  funcType: functionTypeEnums,
  customFunc: string,
  iterations: number,
  error: string
}

export type newtonDataError = {
  xn: string,
  customFunc: string,
  iterations: string,
  error: string
}

export type newtonTableDataError = {
  rows: {
    xn: string,
    customFunc: string,
  }[]
}

export type secantData = {
  xn_1: string,
  xn: string,
  funcType: functionTypeEnums,
  customFunc: string,
  iterations: number,
  error: string
}

export type secantDataError = {
  xn_1: string,
  xn: string,
  customFunc: string,
  iterations: string,
  error: string
}

export type answerType = {
  rows: rowsType,
  cn: number,
  f_cn: number
}

export type rowType = {
  n: number,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f?: number,
  less_than_error: boolean
}

export type rowsType = rowType[]