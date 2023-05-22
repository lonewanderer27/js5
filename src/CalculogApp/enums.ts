export enum markEnums {
	idle = "IDLE",
	pe = "PE",
  peAns = "PE_ANS", 
	tm = "TM",
  tmAns = "TM_ANS",
}

export enum buttonType {
	submitBtn = "submitBtn",
	removeBtn = "removeBtn",
	backBtn = "backBtn"
}

export enum roundingchopping {
	chopping = "CHOPPING",
	rounding = "ROUNDING",
	both = "BOTH"
}

export enum KeyType {
	number = "NUMBER",
	letter = "LETTER",
	special = "SPECIAL",
	secondspecial = "SECONDSPECIAL",
	success = "SUCCESS"
}

export enum InputType {
	none = "none",
	trueValue = "trueValue",
	approxValue = "approxValue",
	roundingchopping = "roundingchopping",
	numDigits = "numDigits",
	function = "function",
	point = "point",
	nthDegree = "nthDegree"
}