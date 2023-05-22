import { roundingchopping } from "./enums";

export let defaultPEValidity = {
  numDigits: true,
  trueValue: false,
	approxValue: true,
  nthDegree: true,
};

export let defaultTMValidity = {
  numDigits: true,
  nthDegree: true,
  xvar: true,
};

export type errorMessagesType = {
	numDigits?: boolean | string,
	trueValue?: boolean | string,
	nthDegree?: boolean | string,
	xvar?: boolean | string
}

export type PEinputsValidity = {
	numDigits: boolean | string;
	trueValue: boolean | string;
	approxValue: boolean | string;
	nthDegree: boolean | string;
}

export type TMinputsValidity = {
	numDigits: boolean | string;
	nthDegree: boolean | string;
	xvar: boolean | string;
}

export type PEAnsprops = {
	approxValue:number,
	absoluteError: number,
	percentageRelativeError: number 
}

export type TMAnsprops = {
	trueVal: number,
	approxValueRounded: number,
	absoluteErrorRounded: number,
	percentageRelativeErrorRounded: number,
	approxValueChopped: number,
	absoluteErrorChopped: number,
	percentageRelativeErrorChopped: number
}

export type PEprops = {
	trueValue: string;
	approxValue: string;
	numDigits: number;
	roundingchopping: roundingchopping
};

export type TMprops = {
	function?: string;
	point?: number;
	nthDegree: number;
	xvar: number;
	numDigits: number;
};

export interface Subpod {
	title: string;
	plaintext: string;
}

export interface Expressiontypes {
	name: string;
}

export interface State {
	name: string;
	input: string;
}

export interface Pod {
	title: string;
	scanner: string;
	id: string;
	position: number;
	error: boolean;
	numsubpods: number;
	subpods: Subpod[];
	expressiontypes: Expressiontypes;
	primary?: boolean;
	states: State[];
}

export interface Queryresult {
	success: boolean;
	error: boolean;
	numpods: number;
	datatypes: string;
	timedout: string;
	timedoutpods: string;
	timing: number;
	parsetiming: number;
	parsetimedout: boolean;
	recalculate: string;
	id: string;
	host: string;
	server: string;
	related: string;
	version: string;
	inputstring: string;
	pods: Pod[];
}

export interface WolframResponse {
	queryresult: Queryresult;
}