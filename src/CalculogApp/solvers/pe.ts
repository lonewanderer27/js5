import { computeError, parseRoundingChopping } from '.';

import { PEAnsprops } from '../types';
import { evaluate } from 'mathjs';
import { roundingchopping } from '../enums';

/**
 * Computes the absolute and percentage relative errors of a given expression with respect to its true value, 
 * after rounding or chopping the expression to a specified number of digits.
 *
 * @param trueValString A string representation of the true value of the expression.
 * @param roundingchopping The type of rounding or chopping to apply to the expression.
 * @param numDigits The number of digits to round or chop the expression to.
 * @returns The rounded or chopped approximation of the expression, as well as its absolute and percentage relative errors.
 */
export function pe2(trueValString: string, approxValString: string, roundingchopping: roundingchopping, numDigits: number): PEAnsprops {
  // Print a message to the console to indicate that the propagation error is being solved.
  console.log("SOLVING PROPAGATION ERROR");

  // Evaluate the true value of the expression using the math.js library.
  const trueVal = evaluate(trueValString);
  const approxVal = evaluate(approxValString)

  // Round or chop the expression to the specified number of digits.
  const [approxValueOutput] = parseRoundingChopping(approxVal, roundingchopping, numDigits);

  // Compute the absolute and percentage relative errors between the true value and the rounded or chopped approximation.
  const [absoluteError, percentageRelativeError] = computeError(trueVal, approxValueOutput);

  // Create an object containing the rounded or chopped approximation of the expression, as well as its absolute and percentage relative errors.
  const result = {
    approxValue: approxValueOutput,
    absoluteError: absoluteError,
    percentageRelativeError: percentageRelativeError
  };

  // Display the result table in the console for easy visualization.
  console.table(result);

  // Return the result object.
  return result;
}


/**
 * Computes the absolute and percentage relative errors of a given expression with respect to its true value, 
 * after rounding or chopping the expression to a specified number of digits.
 *
 * @param trueValString A string representation of the true value of the expression.
 * @param roundingchopping The type of rounding or chopping to apply to the expression.
 * @param numDigits The number of digits to round or chop the expression to.
 * @returns The rounded or chopped approximation of the expression, as well as its absolute and percentage relative errors.
 */
export default function pe(trueValString: string, roundingchopping: roundingchopping, numDigits: number): PEAnsprops {
  // Print a message to the console to indicate that the propagation error is being solved.
  console.log("SOLVING PROPAGATION ERROR");

  // Evaluate the true value of the expression using the math.js library.
  const trueVal = evaluate(trueValString);

  // Round or chop the expression to the specified number of digits.
  const [approxValue] = parseRoundingChopping(trueVal, roundingchopping, numDigits);

  // Compute the absolute and percentage relative errors between the true value and the rounded or chopped approximation.
  const [absoluteError, percentageRelativeError] = computeError(trueVal, approxValue);

  // Create an object containing the rounded or chopped approximation of the expression, as well as its absolute and percentage relative errors.
  const result = {
    approxValue: approxValue,
    absoluteError: absoluteError,
    percentageRelativeError: percentageRelativeError
  };

  // Display the result table in the console for easy visualization.
  console.table(result);

  // Return the result object.
  return result;
}
