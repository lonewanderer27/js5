import "./styles.css"

import { markEnums } from "../../enums"

export default function ControlBtns(props: {
  hasError: boolean;
  screen: markEnums;
  handleBack: () => void;
  handleSubmit: () => void;
  handleClear: () => void;
}) {

  return (
    <div className="row">
      {(props.screen === markEnums.idle) && <>
        <div className="col">
          <button 
            className="py-2 w-100 submitBtn"
            style={{ backgroundColor: props.hasError ? "gray" : "#ffb340"}} 
            onClick={() => {
              !props.hasError && props.handleSubmit()
            }}
            title={props.hasError ? "Please fix the True Value" : ""}
          >
            Submit
          </button>
        </div>
        <div className="col">
          <button 
            className="py-2 w-100 removeBtn" 
            onClick={() => props.handleClear()}
          >
            Clear
          </button>
        </div>
      </>}
      {(props.screen !== markEnums.idle) && 
        <div className="col">
          <button 
            className="py-2 w-100 backBtn" 
            onClick={() => props.handleBack()}
          >
            Back
          </button>
        </div>}
    </div>
  )
}