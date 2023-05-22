import { roundingchopping } from "../enums"

/**
 * Rounds a given number to the specified number of decimal places.
 *
 * @param number - The number to round.
 * @param decimalPlaces - The number of decimal places to round the number to.
 * @returns The rounded number.
 */
export const round = (number: number, decimalPlaces: number) => {
  // Calculate the factor of 10 to multiply by in order to round the number.
  const factorOfTen = Math.pow(10, decimalPlaces)

  // Multiply the number by the factor of 10, round to the nearest integer,
  // then divide by the factor of 10 to get the rounded value.
  return Math.round(number * factorOfTen) / factorOfTen
}


export function truncate(number: number, digits: number): number {
  // Determine the number of decimal places in the number to be truncated
  const numDecimals = number.toString().split('.')[1]?.length ?? 0

  // If the number already has fewer or equal digits to the desired truncation,
  // return the original number since there's nothing to truncate
  if (numDecimals <= digits) {
    return number
  }

  // Calculate a "stepper" value that will be used to shift the decimal point of
  // the number to truncate it to the desired number of digits
  const stepper = 10 ** digits

  // Truncate the number to the desired number of digits by multiplying it by
  // the stepper value, rounding down to an integer using Math.trunc(), and then
  // dividing by the stepper value to shift the decimal point back
  return Math.trunc(number * stepper) / stepper
}


/**
 * Rounds or chops a given number to a specified number of digits, according to the specified rounding or chopping mode.
 *
 * @param value The number to round or chop.
 * @param roundorchop The type of rounding or chopping to apply to the number.
 * @param numDigits The number of digits to round or chop the number to.
 * @returns An array containing the rounded or chopped value of the number.
 */
export function parseRoundingChopping(value: number, roundorchop: roundingchopping, numDigits: number): number[] {
  // Check the specified rounding or chopping mode and apply the corresponding rounding or chopping function.
  if (roundorchop === roundingchopping.both) {
    // If both rounding and chopping are specified, apply both functions and return an array of both results.
    return [round(value, numDigits), truncate(value, numDigits)];
  }
  else if (roundorchop === roundingchopping.chopping) {
    // If only chopping is specified, apply the truncate function and return an array containing the result.
    return [truncate(value, numDigits)];
  }
  else if (roundorchop === roundingchopping.rounding) {
    // If only rounding is specified, apply the round function and return an array containing the result.
    return [round(value, numDigits)];
  }
}


/**
 * Computes the absolute error and percent relative error between a true value and an approximation.
 * @param trueVal The true value.
 * @param approxVal The approximation.
 * @returns An array containing the absolute error and percent relative error.
 */
export function computeError(trueVal: number, approxVal: number): number[] {
  // Compute the absolute error.
  const absoluteError = Math.abs(trueVal - approxVal)
  
  // Compute the percent relative error.
  const percentRelError = Math.abs(absoluteError / trueVal) * 100
  
  // Return an array containing the absolute error and percent relative error.
  return [absoluteError, percentRelError]  
}


/**
 * Calculates the natural logarithm of a given number using Taylor-Maclaurin series
 * @param xvar - the input number to calculate the logarithm of
 * @param nthDegree - the degree of the polynomial to approximate the logarithm
 * @returns the natural logarithm of the input number
 */
export function ln_taylormaclaurin(xvar: number, nthDegree: number): number {
  // Array to store the derivatives
  let dvs = []

  // Calculate the derivatives
  for (let cd = 1; cd < nthDegree+1; cd++) {
      if (cd === 1) {
          // First derivative is 1
          dvs.push(1)
      }
      else if (cd % 2 === 0) {
          const d: number = -((cd-1)*dvs[cd-2]/(0+1)**cd)
          dvs.push(d)
      }
      else if (cd % 2 !== 0) {
          const d: number = ((cd-1)*-dvs[cd-2]/(0+1)**cd)
          dvs.push(d)
      }
  }

  // Print the derivatives array
  console.log("derivatives: ", dvs)

  // Compute the true value of the natural logarithm
  let final_ans = 0
  const dlast = dvs.slice(-1)[0] // last derivative
  console.log("last derivative: ", dlast)

  // Calculate the polynomial approximation of the natural logarithm
  // ct = current term
  for (let ct = 1; ct < nthDegree+1; ct++){
      if (ct === 1) {
          // First term is the input number
          final_ans = xvar
      }
      else if (ct % 2 === 0) {
          // Even terms subtract from the sum
          final_ans -= (Math.pow(xvar, ct)) / ct 
      }
      else {
          // Odd terms add to the sum
          final_ans += (Math.pow(xvar, ct)) /ct
      }
      console.log(ct)
  }

  // Print the final approximation of the natural logarithm
  console.log("final_ans: ", final_ans)

  // Return the final approximation of the natural logarithm
  return final_ans
} 