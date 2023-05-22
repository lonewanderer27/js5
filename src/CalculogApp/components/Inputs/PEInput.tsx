import { markEnums, roundingchopping } from '../../enums';

import ControlBtns from '../ControlBtns';
import Form from 'react-bootstrap/Form';
import { PEinputsValidity } from '../../types';
import React from 'react';
// import Tex2SVG from "react-hook-mathjax";
import { convertToSymbols } from '../../CalculogApp';

export default function PEInput(props: {
  screen: markEnums;
  ansPE: () => void;
  ansIdle: () => void;
  clearInputs: (screen: markEnums) => void;
  trueValue: string;
  approxValue: string;
  roundingchopping: roundingchopping;
  numDigits: number;
  PEvaluesValidity: PEinputsValidity;
  handlePEChange: (e: React.ChangeEvent) => void;
  KB: React.ReactChild;
}) {
  const handleAns = () => {
    if (props.screen === markEnums.peAns) {
      return {
        readOnly: true,
        disabled: true,
        title: "Click Back button to change this"
      }
    }
  }

  return (
    <div className="col-12 col-lg-6 p-0 p-sm-2">
      <div className="pe p-4">
        <h3>Propagation Error</h3> 
        <Form>
          <div className="row">
            <div className="col-12">
              <Form.Group className="mb-3">
                <Form.Label>True Value</Form.Label>
                <Form.Control 
                  name="trueValue" 
                  type="text" 
                  value={convertToSymbols(props.trueValue)} 
                  onChange={props.handlePEChange} 
                  {...handleAns()}
                />
                {/* {props.PEvaluesValidity.trueValue === true && <div className="Tex2SVGContainer">
                  <span style={{display: "absolute", top: 0, right: 0, color: "black"}}>Preview: </span>
                  <Tex2SVG 
                    class="Tex2SVG"
                    display="inline" 
                    latex={`${props.trueValue}`}
                  />
                </div>} */}
                {props.screen === markEnums.idle && props.KB}
                {props.PEvaluesValidity.trueValue !== true && props.trueValue.length > 0 && 
                  <Form.Text style={{color: "red"}}>
                    Invalid true value
                  </Form.Text>}
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Form.Group className="mb-3">
                <Form.Label>Approximate Value</Form.Label>
                <Form.Control 
                  name="approxValue" 
                  type="text" 
                  value={convertToSymbols(props.approxValue)} 
                  onChange={props.handlePEChange} 
                  {...handleAns()}
                />
                {/* {props.PEvaluesValidity.trueValue === true && <div className="Tex2SVGContainer">
                  <span style={{display: "absolute", top: 0, right: 0, color: "black"}}>Preview: </span>
                  <Tex2SVG 
                    class="Tex2SVG"
                    display="inline" 
                    latex={`${props.trueValue}`}
                  />
                </div>} */}
                {/* {props.screen === markEnums.idle && props.KB} */}
                {props.PEvaluesValidity.approxValue !== true && 
                  <Form.Text style={{color: "red"}}>
                    Invalid approximate value
                  </Form.Text>}
                {props.approxValue.length === 0 &&
                  <Form.Text style={{color: "gray"}}>
                    No Approximated value is provided, so it will be computed based on the True Value
                  </Form.Text>}
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-6">
              <Form.Group className="mb-3">
                <Form.Label>Round or Chop</Form.Label>
                <Form.Select name="roundingchopping" onChange={props.handlePEChange} {...handleAns()}>
                  <option value={roundingchopping.rounding}>Rounding</option>
                  <option value={roundingchopping.chopping}>Chopping</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-12 col-xl-6">
              <Form.Group className="mb-3">
                <Form.Label>Number of Decimal Places</Form.Label>
                <Form.Control name="numDigits" value={props.numDigits} type="number" placeholder="5" min={0} onChange={props.handlePEChange} {...handleAns()} />
              </Form.Group>
            </div>
          </div>
        </Form>
        <div className="mt-auto">
          <ControlBtns 
            hasError={props.PEvaluesValidity.trueValue !== true ? true : false}
            handleClear={() => props.clearInputs(markEnums.pe)} 
            screen={props.screen} 
            handleSubmit={() => props.ansPE()}
            handleBack={() => props.ansIdle()} 
          />
        </div>
      </div>
    </div>
  )
}