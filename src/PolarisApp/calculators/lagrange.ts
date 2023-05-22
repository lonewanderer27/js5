import { PxAnsInterface, lagrangeSolveReturns } from '../interfaces';
import math, { evaluate, parse, parser, simplify } from 'mathjs';

function generateFormulaParts(currentN: number, n: number){
  let topPart = ""
  let bottomPart = ""
  for (let i = 0; i < n+1; i++){
    if (i !== currentN) {
      let part = `(x-x${i})`
      topPart += part      

      part = `(x${currentN}-x${i})`
      bottomPart += part
    }
  }
  return [topPart, bottomPart]
}

function generateFormula(n: number){
  let wholeFormula = ""
  console.log("n:", n)
  for (let j = 0; j < n+1; j++){
    console.log(`j: ${j}`);
    const [topPart, bottomPart] = generateFormulaParts(j, n)
    let formula = `(${topPart}/${bottomPart})`

    if (j === n){
      formula += ` * y${j}`
    }
    else {
      formula += ` * y${j} + `
    }

    wholeFormula += formula;
  }
  console.log("Formula: ")
  console.log(wholeFormula)
  return wholeFormula;
}

function subtituteValues(wholeFormula: string, x: string[], y: string[]) {
  let formulaObj: {[key: string]: string} = {}
  for (let k = 0; k < x.length; k++){
    console.log("k:", k);
    formulaObj[`x${k}`] = x[k]
    formulaObj[`y${k}`] = y[k]
  }

  console.log("formulaObj")
  console.table(formulaObj)
  
  for (let key in formulaObj){
    wholeFormula = wholeFormula.replaceAll(key, `(${formulaObj[key]})`)
    console.log(`${key}: ${formulaObj[key]}`)
  }

  console.log("substituted formula")
  console.log(wholeFormula)
  return wholeFormula;
}

export default function solve(n: number, x: string[], y: string[], pVars: string[]): lagrangeSolveReturns {
  console.log("lagrange solve inputs:");
  console.table({n, x, y, pVars})

  const wholeFormula = generateFormula(n-1)

  let s = null;
  let s_string = "";
  let s_tex = "";
  let s_html = ""
  if (n <= 7) {
    s = simplify(subtituteValues(wholeFormula, x, y));
    s_string = s.toString()
    s_tex = s.toTex();
    s_html = s.toHTML();
  } else {
    s_string = subtituteValues(wholeFormula, x, y)
    s = parse(s_string)
    s_tex = s.toTex();
    s_html = s.toHTML();
  }
  
  let pxAnswers = useXes(s_string, pVars);

  return {
    wholeFormula,
    s_string,
    s_tex,
    s_html,
    pxAnswers
  }
}

export function useXes(s_string: string, pVars: string[]) {
  const p = parser();
  p.evaluate(`f(x) = ${s_string}`)
  const useX = p.get('f')

  let pxAnswers: PxAnsInterface[] = []
  pVars.forEach((pVar, i) => {
    const answer: bigint = useX(pVar)
    let obj: PxAnsInterface = {};
    const key = `P(${pVar})`;
    obj[key] = answer; 
    pxAnswers.push(obj)
  })
  return pxAnswers;
}