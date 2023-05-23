import { AnswerType, answerType } from "./types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SlideFade,
  Text,
  useToast
} from "@chakra-ui/react";
import { Modes, functionTypeEnums } from "./enums";
import React, { useEffect } from "react";
import { calcBisectionStandard, testBisectionInterval } from "./calculators/bisection";
import { parser, rationalize } from "mathjs";

import AnswerTable from "./AnswerTable";
import { GlobalState } from "./MantarieApp";
import IterationsTable from "./IterationsTable";
import calculator from "./calculators/calculator";
import { useContext } from "react";

export default function Body() {
  const { 
    showAnswer, setShowAnswer, 
    answer, setAnswer,
    a, setA, b, setB, n, setN, mode, 
    function_, setFunction_
  } = useContext(GlobalState);

  const [isValidFunction, setIsValidFunction] = React.useState<boolean>(() => {
    if (function_.includes("log(x+1)")) {
      return true;
    }
    return false;
  });

  const aHandleChange = (valueAsString: string, valueAsNumber: number) => {
    console.log("New a: ", valueAsString)
    setA(valueAsNumber);
  }

  const bHandleChange = (valueAsString: string, valueAsNumber: number) => {
    console.log("New b: ", valueAsString)
    setB(valueAsNumber);
  }

  const nHandleChange = (valueAsString: string, valueAsNumber: number) => {
    console.log("New n: ", valueAsString)
    setN(valueAsNumber);
  }

  const functionHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("function has changed! to ", e.target.value);
    setFunction_(e.target.value);

    try {
      const p = parser();
      p.evaluate("f(x) = "+e.target.value);
      const testFunc = p.get('f');
      testFunc(1);
      setIsValidFunction(true);
    } catch {
      setIsValidFunction(false);
    }
  }

  const determineIfCanCompute = () => {
    let canCompute = true;
    if (a == b) {
      canCompute = false;
    }
    if (isValidFunction == false) {
      canCompute = false;
    }
    return canCompute;
  }

  const toast = useToast();

  const computeAnswer = () => {
    let testResults;
    if (function_.includes("log(x+1)")) {
      testResults = testBisectionInterval(a, b, functionTypeEnums.LogFunction, "f(x) = "+function_);
    } else {
      testResults = testBisectionInterval(a, b, functionTypeEnums.AnyFunction, "f(x) = "+function_);
    }
    
    // if the testBisection failed, that means we don't have a root
    // therefore this function is computable for simpson's method
    if (testResults.success == false) {
      // but for last time, let's check if the answer is infinity
      const answer: AnswerType = calculator(a, b, n, function_);

      let bisectionResults;
      if (function_.includes("log(x+1)")){
        bisectionResults = calcBisectionStandard(a, b, functionTypeEnums.LogFunction, "f(x) = "+function_, 999999, 0.000000000000001);
      } else {
        bisectionResults = calcBisectionStandard(a, b, functionTypeEnums.AnyFunction, "f(x) = "+function_, 999999, 0.000000000000001)
      }

      // if it has infinity, then let's display the c from the last row of bisection result
      if (answer.ans_si === Infinity || answer.ans_ti === Infinity || isNaN(answer.ans_si) === true || isNaN(answer.ans_ti) === true) {
        toast({
          title: `Function is not computable`,
          description: `f(x) is not defined at ${bisectionResults !== undefined ? bisectionResults.cn : "c"} which is inside [${a}, ${b}]`,
          variant: "solid",
          status: "error",
          isClosable: true,
          position: "top",
          size: "lg",
          containerStyle: {
            width: "750px"
          }
        })
      } 
      
      // everything is really fine!
      else {
        setAnswer(calculator(a, b, n, function_));
        setShowAnswer(!showAnswer);
      }
    } 
    // otherwise, this function have a root
    // therefore it's not computable
    else {
      console.table(testResults);

      const findRoot = true;
      let bisectionResults: answerType = undefined;

      if (findRoot) {
        if (function_.includes("log(x+1)")){
          bisectionResults = calcBisectionStandard(a, b, functionTypeEnums.LogFunction, "f(x) = "+function_, 999999, 0.000000000000001);
        } else {
          bisectionResults = calcBisectionStandard(a, b, functionTypeEnums.AnyFunction, "f(x) = "+function_, 999999, 0.000000000000001)
        }

        console.log(bisectionResults)
      }

      // const node = rationalize(function_).
      // const denominator = node.args[1].args[0]

      // console.log(``);

      toast({
        title: `Function is not computable`,
        description: `f(x) is not defined at ${bisectionResults !== undefined ? bisectionResults.cn : "c"} which is inside [${a}, ${b}]`,
        variant: "solid",
        status: "error",
        isClosable: true,
        position: "top",
        size: "lg",
        containerStyle: {
          width: "750px"
        }
      })
    }
  }

  const toggleShowAnswer = () => {

    if (showAnswer == true) {
      setShowAnswer(false);
    } else {
      computeAnswer();
    }
  }

  useEffect(() => {
    if (mode == Modes.PREDEFINED) {
      setFunction_("log(x+1)");
      setIsValidFunction(true);
    }
    if (mode == Modes.USERDEFINED) {
      setFunction_("");
      setIsValidFunction(false);
    }
    setShowAnswer(false);
  }, [mode])

  console.log("valid function")
  console.log(isValidFunction)

  return (
    <div className="p-10 ">
      <div className="flex gap-4 pb-10">
        <div className="w-full">
          <FormControl className="pb-10" isInvalid={!isValidFunction} >
            <FormLabel>Function{mode === Modes.PREDEFINED && ": Natural Logarithmic"}</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon children="f(x) =" />
              <Input
                isReadOnly={showAnswer || mode == Modes.PREDEFINED}
                errorBorderColor='crimson' 
                name="function" 
                value={mode == Modes.PREDEFINED ? "ln(x+1)" : function_} 
                onChange={functionHandleChange} 
              />
            </InputGroup>
            <FormErrorMessage>Invalid function</FormErrorMessage>
          </FormControl>
        </div>
        {/* <div className="w-full md:w-1/2 flex flex-col justify-center">
          <Text>
            ≈ {mode === Modes.PREDEFINED ? "2.545177444" : ""}
          </Text>
        </div> */}
      </div>
      <div className="flex flex-col md:flex-row gap-4 pb-10">
        <div className="w-full md:w-1/4">
          <FormControl>
            <FormLabel><Text>Lower Limit</Text></FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon children="a" />
              <NumberInput isReadOnly={showAnswer} name="a" value={a} onChange={aHandleChange} >
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </div>
        <div className="w-full md:w-1/4">
          <FormControl>
            <FormLabel><Text>Upper Limit</Text></FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon children="b" />
              <NumberInput isReadOnly={showAnswer} name="b" value={b} onChange={bHandleChange}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </div>
        <div className="w-full md:w-1/4">
          <FormControl>
            <FormLabel><Text>Interval</Text></FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon children="n" />
              <NumberInput isReadOnly={showAnswer} min={2} defaultValue={2}  name="n" value={n} onChange={nHandleChange}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </div>
        <div className="w-full md:w-1/4 sm:w-full flex flex-col justify-end">
          <Button 
            isDisabled={!determineIfCanCompute()}
            colorScheme={showAnswer ? "yellow" : "blue"}
            variant="outline"
            className="font-secondary"
            size="lg"
            onClick={() => toggleShowAnswer()}
          >
            {showAnswer ? "Change Values" : "Show Answer"}
          </Button>
        </div>
      </div>

      {showAnswer && 
      <SlideFade in={showAnswer} offsetY="20px">
        <div className="pb-10">
          <AnswerTable answer={answer} function_={function_} a={a} b={b} n={n}/>
        </div>
      </SlideFade>
      }

      {showAnswer && 
      <SlideFade in={showAnswer} offsetY="50px">
        <div className="pb-10">
          <IterationsTable answer={answer}/>
        </div>
      </SlideFade>
      }
    </div>
  );
}
