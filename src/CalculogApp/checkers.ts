import { PEinputsValidity, PEprops, TMinputsValidity, TMprops, defaultPEValidity, defaultTMValidity } from "./types";

import { evaluate } from "mathjs";

export function checkPEVals(PEvalues: PEprops): PEinputsValidity {
  let inputValidity = {
    numDigits: true,
    trueValue: true,
    approxValue: true,
    nthDegree: true,
  };
  
  if (PEvalues.numDigits < 0) {
    inputValidity.numDigits = false;
  } 

  if (PEvalues.trueValue.length === 0) {
    inputValidity.trueValue = false
  }

  console.log("evaluating true value in PE")
  try {
    evaluate(PEvalues.trueValue)
  } catch {
    inputValidity.trueValue = false
    console.log("Invalid true value in Propagation Error")
  }

  console.log("evaluating approx value in PE")
  if (PEvalues.approxValue.length > 0) {
    try {
      evaluate(PEvalues.approxValue)
    } catch {
      inputValidity.approxValue = false
      console.log("Invalid approximate value in Propagation Error")
    }
  }

  console.log("inputValidity: ")
  console.table(inputValidity)

  return inputValidity
}

export function checkTMVals(TMvalues: TMprops): TMinputsValidity {
  let inputValidity = {
    numDigits: true,
    nthDegree: true,
    xvar: true,
  };

  if (TMvalues.nthDegree < 1){
    inputValidity.nthDegree = false;
  }

  if (TMvalues.numDigits < 0){
    inputValidity.numDigits = false;
  }

  if (TMvalues.xvar <= 0){
    inputValidity.xvar = false;
  }

  return inputValidity;
}