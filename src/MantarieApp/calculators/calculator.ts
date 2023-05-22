import { AnswerType, TableRow } from "../types";

import { parser } from "mathjs";

export default function calculator(a: number, b: number, n: number, function_: string): AnswerType {
  const p = parser();
  p.evaluate(`f(x) = ${function_}`);
  const execFunc = p.get("f");

  const deltaX = getDeltaX(a, b, n);

  console.log("a (lower lim): ",a)
  console.log("b (upper lim): ",b)
  console.log("n (number of intervals): ",n)
  console.log(`DeltaX: ${deltaX}`)

  const iterations: TableRow[] = [];
  let sum_si = 0;
  let sum_ti = 0;

  let i = 0;
  let xi = 0;
  let f_xi = 0;
  let ti = 0;
  let si = 0;

  for (let j = 0; j < n+1; j++) {
    console.log("==========================")

    i = j;

    // first loop
    if (j == 0) {
      console.log("First Loop")
      i = 0;
      xi = 0;
    } 

    if (j >= 1) {
      xi = xi + deltaX;
      f_xi = execFunc(xi);
    }

    // middle loop
    if (j != n && j != 0){
      console.log("Middle Loop")
      ti = f_xi * 2;
      if (j % 2 == 0) {
        si = f_xi * 2;
      } else {
        si = f_xi * 4;
      }
    }

    if (j == n){
      console.log("Last Loop")
      ti = f_xi;
      si = f_xi;
    }

    const newRow = {
      i: i,
      xi: xi,
      f_xi: f_xi,
      ti: ti,
      si: si
    }

    iterations.push(newRow);
    sum_si += si;
    sum_ti += ti;

    console.log("i: ",i)
    console.log("xi: ",xi)
    console.log("f_xi: ",f_xi)
    console.log("ti: ",ti)
    console.log("si: ",si)
    console.log("==========================")
  }

  const ans_ti = ( deltaX / 2 ) * sum_ti;
  const ans_si = ( deltaX / 3 ) * sum_si;

  console.log("Iterations Table: ")
  console.table(iterations);
  console.log(`Ans for Trapezoidal Method: ${ans_ti}`)
  console.log(`Sum of ti: ${sum_ti}`)
  console.log(`Ans for Simpson's Method: ${ans_si}`)
  console.log(`Sum of si: ${sum_si}`)


  return {
    deltaX: deltaX,
    iterations: iterations,
    ans_si: ans_si,
    sum_si: sum_si,
    sum_ti: sum_ti,
    ans_ti: ans_ti
  }
}

export function getDeltaX(a: number, b: number, n: number){
  return (b - a) / n;
}