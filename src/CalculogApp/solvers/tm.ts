import { computeError, ln_taylormaclaurin, parseRoundingChopping } from ".";

import { TMAnsprops } from "../types";
import { roundingchopping } from "../enums";

/**
 * Computes the Taylor-Maclaurin series approximation of ln(x) up to the nth degree,
 * and calculates its true value, rounded and chopped approximations, absolute and percentage relative errors.
 *
 * @param xvar The input value to compute the approximation for.
 * @param nthDegree The nth degree of the Taylor-Maclaurin series.
 * @param numDigits The number of digits to round or chop the approximation to.
 * @returns The true value, rounded and chopped approximations, absolute and percentage relative errors of the approximation.
 */
export default function tm(xvar: number, nthDegree: number, numDigits: number): TMAnsprops {
  // Print a message to the console to indicate that the Taylor-Maclaurin approximation is being solved.
  console.log("SOLVING TAYLOR-MACLAURIN");

  // Compute the true value of ln(x) using the Taylor-Maclaurin series.
  const trueVal = ln_taylormaclaurin(xvar, nthDegree);

  // Compute the rounded and chopped approximations of the true value.
  const [approxValueRounded, approxValueChopped] = parseRoundingChopping(trueVal, roundingchopping.both, numDigits);

  // Compute the absolute and percentage relative errors between the true value and the rounded approximation.
  const [absoluteErrorRounded, percentageRelativeErrorRounded] = computeError(trueVal, approxValueRounded);

  // Compute the absolute and percentage relative errors between the true value and the chopped approximation.
  const [absoluteErrorChopped, percentageRelativeErrorChopped] = computeError(trueVal, approxValueChopped);

  // Create an object containing the true value, rounded and chopped approximations, absolute and percentage relative errors.
  const result = {
    trueVal: trueVal,
    approxValueRounded: approxValueRounded,
    approxValueChopped: approxValueChopped,
    absoluteErrorRounded: absoluteErrorRounded,
    absoluteErrorChopped: absoluteErrorChopped,
    percentageRelativeErrorRounded: percentageRelativeErrorRounded,
    percentageRelativeErrorChopped: percentageRelativeErrorChopped
  };

  // Display the result table in the console for easy visualization.
  console.table(result);

  // Return the result object.
  return result;
}
