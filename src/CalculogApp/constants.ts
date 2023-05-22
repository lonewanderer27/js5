import { PEAnsprops, TMAnsprops } from "./types"

import { roundingchopping } from "./enums"

export const defaultPEVals = {
  trueValue: "",
  approxValue: "",
  roundingchopping: roundingchopping.rounding,
  numDigits: 0,
}

export const defaultTMVals = {
  nthDegree: 1,
  xvar: 1,
  numDigits: 0,
}

export const defaultPEAns:PEAnsprops = {
  approxValue: 0,
  absoluteError: 0,
  percentageRelativeError: 0
}

export const defaultTMAns:TMAnsprops = {
  trueVal: 0,
  approxValueRounded: 0,
  absoluteErrorRounded: 0,
  percentageRelativeErrorRounded: 0,
  approxValueChopped: 0,
  absoluteErrorChopped: 0,
  percentageRelativeErrorChopped: 0,
}