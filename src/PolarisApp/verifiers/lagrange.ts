import { lagrangeVerifyReasons, lagrangeVerifyReturns } from "../interfaces";

import { evaluate } from "mathjs";

export function verify(n: number, x: string[], y: string[], pVars: string[]): lagrangeVerifyReturns {
  let success = true;
  let reasons: lagrangeVerifyReasons = {
    n: [],
    x: [],
    y: [],
    p: [],
    pVars: []
  }

  try {
    if (n < 2){
      success = false;
      reasons.n.push("n must be greater than or equal to 2")
    } else if (n >= 2) { 
      x.forEach((xVar, i) => {
        if (xVar === ""){
          success = false;
          reasons.x.push(`x${i} is empty`)
        }
        if (evaluate(xVar) == undefined) {
          success = false;
          reasons.x.push(`x${i} is invalid`)
        }
      })
  
      y.forEach((yVar, i) => {
        if (yVar === ""){
          success = false;
          reasons.y.push(`y${i} is empty`)
        }
        if (evaluate(yVar) == undefined) {
          success = false;
          reasons.y.push(`y${i} is invalid`)
        }
      })
    }
  
    if (pVars.length < 1) {
      success = false;
      reasons.pVars.push("pVars is empty")
    } else {
      pVars.forEach((pVar, i) => {
        if (pVar === ""){
          success = false;
          reasons.pVars.push(`pVars${i} is empty`)
        }
        if (evaluate(pVar) == undefined) {
          success = false;
          reasons.pVars.push(`pVars${i} is invalid`)
        }
      })
    }
  } catch (e) {
    success = false;
  }

  return {
    success,
    reasons
  }
}