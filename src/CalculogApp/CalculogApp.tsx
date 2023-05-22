import './App.css'
import "react-simple-keyboard/build/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { PEAnsprops, PEinputsValidity, PEprops, TMAnsprops, TMinputsValidity, TMprops, defaultPEValidity, defaultTMValidity } from './types';
import { checkPEVals, checkTMVals } from './checkers';
import { defaultPEAns, defaultPEVals, defaultTMAns, defaultTMVals } from './constants';
import { markEnums } from './enums';
import pe, { pe2 } from './solvers/pe';
import { useEffect, useRef, useState } from 'react'

import Header from './components/Header';
import Keyboard from "react-simple-keyboard"
import PEInput from './components/Inputs/PEInput';
import PESolution from './components/Solutions/PESolution';
import TMInput from './components/Inputs/TMInput';
import TMSolution from './components/Solutions/TMSolution';
import tm from './solvers/tm';

function CalculogApp() {
  const [screen, setScreen] = useState<markEnums>(() => markEnums.idle)

  const ansPE = () => {
    setScreen(() => markEnums.peAns);
  };
  const ansTM = () => {
    setScreen(() => markEnums.tmAns);
  };
  const ansIdle = () => setScreen(() => markEnums.idle);

  const [PEinputs, setPEInputs] = useState<PEprops>(() => defaultPEVals);
	const [TMinputs, setTMInputs] = useState<TMprops>(() => defaultTMVals);
  const [PEinputsValid, setPEInputsValid] = useState<PEinputsValidity>(() => defaultPEValidity);
  const [TMinputsValid, setTMInputsValid] = useState<TMinputsValidity>(() => defaultTMValidity);
  const [PEanswers, setPEanswers] = useState<PEAnsprops>(() => defaultPEAns);
  const [TManswers, setTManswers] = useState<TMAnsprops>(() => defaultTMAns);
  const keyboard = useRef(null);

  useEffect(() => {
    switch(screen) {
      case markEnums.peAns: {
        if (PEinputs.approxValue.length > 0) {
          setPEanswers(() => pe2(
            PEinputs.trueValue,
            PEinputs.approxValue,
            PEinputs.roundingchopping, 
            Number(PEinputs.numDigits)
          ))
        } else if (PEinputs.approxValue.length === 0) {
          setPEanswers(() => pe(
            PEinputs.trueValue, 
            PEinputs.roundingchopping, 
            Number(PEinputs.numDigits)
          ))
        }
      } break;
      case markEnums.tmAns: {
        setTManswers(() => tm(
          Number(TMinputs.xvar), 
          Number(TMinputs.nthDegree), 
          Number(TMinputs.numDigits)
        ))
      } break;
    }
  }, [PEinputs, TMinputs, PEinputsValid, TMinputsValid, screen])

  useEffect(() => {
    const PEdata = JSON.parse(localStorage.getItem("calculog-pedata") || null)
    if (PEdata) {
      setPEInputs(PEdata)
      setPEInputsValid(checkPEVals(PEdata))
    }

    const TMdata = JSON.parse(localStorage.getItem("calculog-tmdata") || null)
    if (TMdata) {
      setTMInputs(TMdata)
      setTMInputsValid(checkTMVals(TMdata))
    }
  }, [])

  const handleKBPEChange = (input: string) => {
    const newTrueValue = convertFromSymbols(input); 
    setPEInputs((prev) => {
      const newState = {
        ...prev,
        trueValue: newTrueValue,
      }
      setPEInputsValid(checkPEVals(newState))
      localStorage.setItem("calculog-pedata", JSON.stringify(newState))
      return newState;
    })
  }

  const handlePEChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e)
    const newTrueValue = convertFromSymbols(e.target.value)
    setPEInputs((prev) => {
      const newState = {
        ...prev,
        [e.target.name]: newTrueValue
      }
      keyboard.current.setInput(newTrueValue)
      setPEInputsValid(checkPEVals(newState))
      localStorage.setItem("calculog-pedata", JSON.stringify(newState))
      return newState;
    })
  }

  const handleTMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setTMInputs((prev) => {
      const newState = {
        ...prev,
        [e.target.name]: e.target.value
      }
      setTMInputsValid(checkTMVals(newState))
      localStorage.setItem("calculog-tmdata", JSON.stringify(newState))
      return newState;
    })
  }

  const clearInputs = (screen: markEnums) => {
    if (screen === markEnums.pe) {
      setPEInputs(() => defaultPEVals);
      setPEInputsValid(() => checkPEVals(defaultPEVals));
    } else if (screen === markEnums.tm) {
      setTMInputs(() => defaultTMVals);
      setTMInputsValid(() => checkTMVals(defaultTMVals));
    }
  }

  console.table(PEinputs)
  console.table(TMinputs)
  console.log("PEvaluesValid")
  console.table(PEinputsValid)
  console.log("TMvaluesValid")
  console.table(TMinputsValid)
  console.log("screen: ", screen)
  console.log("Answers:")

  const KBTV = () => {
    return (
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        onChange={input => handleKBPEChange(input)}
        theme={"hg-theme-default hg-layout-default myTheme"}
        layout={{
          default: [
            // "1 2 3 4 5 6 7 8 9 0",
            "π ℯ log(x) sqrt(x) (x/y)",
            "+ - * / , . ( [ ] )"
          ],
        }}
      />
    )
  }

  return (
    <div className="App container d-flex flex-column justify-content-between">
      <div className="row">
        <Header/>
      </div>
      <div className="row p-0 p-sm-4">
        {(screen === markEnums.idle || screen === markEnums.pe || screen === markEnums.peAns) && 
        <PEInput 
          clearInputs={clearInputs} 
          screen={screen} 
          ansPE={ansPE} 
          ansIdle={ansIdle} 
          handlePEChange={handlePEChange}
          PEvaluesValidity={PEinputsValid}
          KB={KBTV()}
          {...PEinputs} 
        />}
        {(screen === markEnums.peAns) && <PESolution {...PEanswers}/>}
        {(screen === markEnums.idle || screen === markEnums.tm || screen === markEnums.tmAns) && 
        <TMInput 
          clearInputs={clearInputs} 
          screen={screen} 
          ansTM={ansTM} 
          ansIdle={ansIdle} 
          handleTMChange={handleTMChange}
          TMvaluesValidity={TMinputsValid}
          {...TMinputs} 
        />
        }
        {(screen === markEnums.tmAns) && <TMSolution {...TManswers} />}
      </div>
      <div className="row">
        {/* <BottomToolbar/> */}
      </div>
    </div>
  )
}

export default CalculogApp

// eslint-disable-next-line react-refresh/only-export-components
export const convertToSymbols = (input: string) => {
  return input.replace(/pi|e/gi, (match: string) => {
    if (match.toLowerCase() === "pi") {
      return "π";
    }
    if (match.toLowerCase() === "e") {
      return "ℯ";
    }
  })
}

// eslint-disable-next-line react-refresh/only-export-components
export const convertFromSymbols = (input:string) => {
  return input.replace(/π|ℯ/gi, (match: string) => {
    if (match.toLowerCase() === "π") {
      return "pi";
    }
    if (match.toLowerCase() === "ℯ") {
      return "e";
    }
  })
}